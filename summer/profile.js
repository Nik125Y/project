$(document).ready(function() {
  // Инициализация баланса
  let currentBalance = parseInt(localStorage.getItem('userBalance')) || 0;
  updateBalanceDisplay();
  loadOrders();

  function updateBalanceDisplay() {
    $('.profile-section h3.mb-0').text(currentBalance.toLocaleString() + ' ₽');
  }

  // Загрузка заказов
  function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('userOrders')) || [];
    const currentOrdersList = $('#current-orders-list');
    const completedOrdersList = $('#completed-orders-list');
    
    currentOrdersList.empty();
    completedOrdersList.empty();

    if (orders.length === 0) {
      currentOrdersList.html('<div class="alert alert-info">У вас пока нет текущих заказов.</div>');
      completedOrdersList.html('<div class="alert alert-info">У вас пока нет завершенных заказов.</div>');
      return;
    }

    orders.forEach((order, index) => {
      const orderHtml = createOrderCard(order, index);
      if (order.status === 'completed') {
        completedOrdersList.append(orderHtml);
      } else {
        currentOrdersList.append(orderHtml);
      }
    });

    // Если нет заказов в какой-либо категории, показываем сообщение
    if (currentOrdersList.children().length === 0) {
      currentOrdersList.html('<div class="alert alert-info">У вас пока нет текущих заказов.</div>');
    }
    if (completedOrdersList.children().length === 0) {
      completedOrdersList.html('<div class="alert alert-info">У вас пока нет завершенных заказов.</div>');
    }
  }

  // Создание карточки заказа
  function createOrderCard(order, index) {
    const orderDate = new Date(order.date).toLocaleDateString('ru-RU');
    const totalAmount = order.items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    
    return `
      <div class="card mb-3">
        <div class="card-header d-flex justify-content-between align-items-center">
          <div>
            <h5 class="mb-0">Заказ #${index + 1}</h5>
            <small class="text-muted">Дата: ${orderDate}</small>
          </div>
          <span class="badge ${order.status === 'completed' ? 'bg-success' : 'bg-primary'}">
            ${order.status === 'completed' ? 'Завершен' : 'В обработке'}
          </span>
        </div>
        <div class="card-body">
          <div class="order-items">
            ${order.items.map(item => `
              <div class="d-flex align-items-center mb-3">
                <img src="${item.image}" alt="${item.title}" class="rounded" style="width: 60px; height: 80px; object-fit: cover;">
                <div class="ms-3">
                  <h6 class="mb-1">${item.title}</h6>
                  <p class="text-muted mb-0">Количество: ${item.quantity || 1}</p>
                </div>
                <div class="ms-auto text-end">
                  <div class="h6 mb-0">${(item.price * (item.quantity || 1)).toLocaleString()} ₽</div>
                </div>
              </div>
            `).join('')}
          </div>
          <hr>
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Итого:</h5>
            <h5 class="mb-0">${totalAmount.toLocaleString()} ₽</h5>
          </div>
        </div>
      </div>
    `;
  }

  // Переключение между разделами профиля
  $('.btn-profile-menu').on('click', function() {
    $('.btn-profile-menu').removeClass('active');
    $(this).addClass('active');
    var section = $(this).data('section');
    $('.profile-section').hide();
    $('#' + section).show();
    
    if (section === 'profile-orders') {
      loadOrders();
    }
  });

  // Форматирование номера карты
  $('#balanceForm input[placeholder="0000 0000 0000 0000"]').on('input', function() {
    let value = $(this).val().replace(/\D/g, '');
    let formattedValue = '';
    for(let i = 0; i < value.length; i++) {
      if(i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }
    $(this).val(formattedValue);
  });

  // Форматирование срока действия карты
  $('#balanceForm input[placeholder="ММ/ГГ"]').on('input', function() {
    let value = $(this).val().replace(/\D/g, '');
    if(value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    $(this).val(value);
  });

  // Только цифры для CVV
  $('#balanceForm input[placeholder="000"]').on('input', function() {
    $(this).val($(this).val().replace(/\D/g, ''));
  });

  // Обработка отправки формы пополнения баланса
  $('#balanceForm').on('submit', function(e) {
    e.preventDefault();
    
    const cardNumber = $('#balanceForm input[placeholder="0000 0000 0000 0000"]').val();
    const expiryDate = $('#balanceForm input[placeholder="ММ/ГГ"]').val();
    const cvv = $('#balanceForm input[placeholder="000"]').val();
    const amount = parseInt($('#balanceForm input[type="number"]').val());

    if(!cardNumber || !expiryDate || !cvv || !amount) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    if(amount <= 0) {
      alert('Сумма пополнения должна быть больше 0');
      return;
    }

    // Обновляем баланс
    currentBalance += amount;
    localStorage.setItem('userBalance', currentBalance);
    updateBalanceDisplay();

    // Здесь должна быть логика отправки данных на сервер
    alert('Баланс успешно пополнен');
    this.reset();
  });

  // Обработка подтверждения выхода из аккаунта
  $('#confirmLogoutBtn').on('click', function() {
    localStorage.removeItem('user');
    localStorage.removeItem('userBalance'); // Очищаем баланс при выходе
    window.location.href = 'auth.html';
  });

  // Обработка подтверждения удаления аккаунта
  $('#confirmDeleteBtn').on('click', function() {
    localStorage.removeItem('user');
    localStorage.removeItem('userBalance'); // Очищаем баланс при удалении
    window.location.href = 'auth.html';
  });

  // Обработка изменения пароля
  $('#savePasswordBtn').on('click', function() {
    const currentPassword = $('#currentPassword').val();
    const newPassword = $('#newPassword').val();
    const confirmPassword = $('#confirmPassword').val();

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Новые пароли не совпадают');
      return;
    }

    // Здесь должна быть логика отправки данных на сервер
    $('#passwordModal').modal('hide');
    $('#passwordChangeForm')[0].reset();
    alert('Пароль успешно изменен');
  });

  // Обработка изменения email
  $('#saveEmailBtn').on('click', function() {
    const newEmail = $('#newEmail').val();

    if (!newEmail) {
      alert('Пожалуйста, введите новый email');
      return;
    }

    // Здесь должна быть логика отправки данных на сервер
    $('#emailModal').modal('hide');
    $('#emailChangeForm')[0].reset();
    alert('Email успешно изменен');
  });

  // Очистка форм при закрытии модальных окон
  $('.modal').on('hidden.bs.modal', function() {
    $(this).find('form')[0].reset();
  });
}); 