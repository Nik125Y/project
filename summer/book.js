function addToCart(bookId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
  const book = books.find(b => b.id === bookId);
  
  if (book) {
    cart.push({
      id: bookId,
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.image
    });
    selectedItems.push(cart.length - 1);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    updateCartTotal();
  }
}

function updateCartTotal() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
  const total = cart.reduce((sum, item, index) => {
    if (selectedItems.includes(index)) {
      return sum + item.price;
    }
    return sum;
  }, 0);
  
  // Обновляем отображение суммы в корзине в шапке
  $('#cart-total').text(total + ' ₽');
}

$(document).ready(function () {
  // Загружаем текущую сумму корзины при загрузке страницы
  updateCartTotal();
  
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = parseInt(urlParams.get("id"));

  const book = books.find(b => b.id === bookId);

  if (book) {
    $('#book-title').text(book.title);
    $('#book-author').text(book.author);
    $('#book-description').text(book.description);
    $('#book-year').text(book.year);
    $('#book-price').text(book.price + ' ₽');
    $('#book-publisher').text(book.publisher);
    $('#book-genre').text(book.genre);
    $('#book-image').attr('src', book.image);

    $('#buy-btn').click(function () {
      addToCart(book.id);
    });
  } else {
    $('main').html('<div class="text-center text-danger">Книга не найдена</div>');
  }
});