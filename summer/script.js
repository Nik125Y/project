// Функция добавления в корзину
function addToCart(bookId, title, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ id: bookId, title, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartTotal();
}

// Функция обновления суммы в корзине
function updateCartTotal() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, item) => sum + parseInt(item.price), 0);
  $('#cart-total').text(`${total} ₽`);
}

// Инициализация карусели
$(document).ready(function() {
  $('.book-carousel').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    dots: false,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1 }
      }
    ]
  });

  // Добавление книг в карусель
  books.forEach(book => {
    const bookHtml = `
      <div>
        <a href="book.html?id=${book.id}" class="text-decoration-none text-dark">
          <div class="card border-0">
            <img src="${book.image}" alt="${book.title}" class="book-cover card-img-top" />
            <div class="card-body p-2">
              <div class="book-title">${book.title}</div>
              <div class="book-price">${book.price} ₽</div>
              <button class="btn btn-sm btn-outline-primary mt-2 w-100 buy-btn" 
                      data-id="${book.id}" 
                      data-title="${book.title}" 
                      data-price="${book.price}">
                Купить
              </button>
            </div>
          </div>
        </a>
      </div>
    `;
    $('.book-carousel').slick('slickAdd', bookHtml);
  });

  // Обработчик кнопки "Купить"
  $(document).on('click', '.buy-btn', function(e) {
    e.preventDefault();
    const bookId = parseInt($(this).data('id'));
    const title = $(this).data('title');
    const price = parseInt($(this).data('price'));
    addToCart(bookId, title, price);
  });

  // Обновление суммы при загрузке страницы
  updateCartTotal();
});