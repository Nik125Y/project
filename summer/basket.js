$(document).ready(function() {
  // Загрузка корзины при открытии страницы
  loadCart();
  updateCartTotal();
});

function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || cart.map((_, index) => index);
  const cartItems = $('#cart-items');
  cartItems.empty();

  if (cart.length === 0) {
    cartItems.html('<p class="text-center text-muted my-5">Корзина пуста</p>');
    localStorage.setItem('selectedItems', JSON.stringify([]));
    return;
  }

  cart.forEach((item, index) => {
    const isChecked = selectedItems.includes(index);
    const quantity = item.quantity || 1;
    const itemHtml = `
      <div class="cart-item d-flex align-items-center p-3 border-bottom">
        <div class="cart-item-checkbox me-3">
          <input type="checkbox" class="form-check-input item-checkbox" 
                 data-index="${index}" data-price="${item.price}" 
                 ${isChecked ? 'checked' : ''} style="width: 20px; height: 20px;">
        </div>
        <div class="cart-item-image" style="width: 100px;">
          <img src="${item.image}" alt="${item.title}" class="img-fluid rounded">
        </div>
        <div class="cart-item-details flex-grow-1 px-4">
          <h5 class="mb-1">${item.title}</h5>
          <p class="text-muted mb-0">Автор: ${item.author || 'Не указан'}</p>
        </div>
        <div class="cart-item-price text-end" style="width: 200px;">
          <div class="quantity-controls d-flex align-items-center justify-content-end mb-2">
            <button class="btn btn-sm btn-outline-secondary me-2 decrease-quantity" data-index="${index}">-</button>
            <span class="quantity-display">${quantity}</span>
            <button class="btn btn-sm btn-outline-secondary ms-2 increase-quantity" data-index="${index}">+</button>
          </div>
          <div class="h5 mb-0">${item.price * quantity} ₽</div>
          <button class="btn btn-sm btn-outline-danger mt-2" onclick="removeFromCart(${index})">
            Удалить
          </button>
        </div>
      </div>
    `;
    cartItems.append(itemHtml);
  });

  // Обработчики изменения количества
  $('.decrease-quantity').click(function() {
    const index = $(this).data('index');
    updateQuantity(index, -1);
  });

  $('.increase-quantity').click(function() {
    const index = $(this).data('index');
    updateQuantity(index, 1);
  });

  // Обработчик изменения чекбоксов
  $('.item-checkbox').change(function() {
    const selectedIndexes = [];
    $('.item-checkbox').each(function() {
      if ($(this).is(':checked')) {
        selectedIndexes.push($(this).data('index'));
      }
    });
    localStorage.setItem('selectedItems', JSON.stringify(selectedIndexes));
    updateTotalPrice();
  });

  updateTotalPrice();
}

function updateQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart[index]) {
    cart[index].quantity = (cart[index].quantity || 1) + change;
    if (cart[index].quantity < 1) cart[index].quantity = 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
  }
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
  
  cart.splice(index, 1);
  selectedItems = selectedItems.filter(itemIndex => itemIndex !== index)
    .map(itemIndex => itemIndex > index ? itemIndex - 1 : itemIndex);
  
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
  loadCart();
  updateCartTotal();
}

function updateTotalPrice() {
  let total = 0;
  $('.item-checkbox:checked').each(function() {
    const index = $(this).data('index');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart[index];
    if (item) {
      total += parseInt(item.price) * (item.quantity || 1);
    }
  });
  $('#cart-total-price').text(total + ' ₽');
  updateCartTotal();
}

function updateCartTotal() {
  let total = 0;
  $('.item-checkbox:checked').each(function() {
    const index = $(this).data('index');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart[index];
    if (item) {
      total += parseInt(item.price) * (item.quantity || 1);
    }
  });
  $('#cart-total').text(total + ' ₽');
}

// Обработчик кнопки оформления заказа
$('#checkout-btn').click(function() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    return;
  }
  
  // Получаем только выбранные товары
  const selectedItems = [];
  $('.item-checkbox:checked').each(function() {
    const index = $(this).data('index');
    selectedItems.push(cart[index]);
  });

  if (selectedItems.length === 0) {
    return;
  }
  
  // Удаляем только выбранные товары
  const remainingItems = cart.filter((item, index) => 
    !$('.item-checkbox:checked').toArray().some(cb => $(cb).data('index') === index)
  );
  
  localStorage.setItem('cart', JSON.stringify(remainingItems));
  localStorage.setItem('selectedItems', JSON.stringify([]));
  loadCart();
}); 