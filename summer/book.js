$(document).ready(function () {
  // 1. Получаем ID из URL
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = parseInt(urlParams.get("id"));

  // 2. Заглушка: массив книг 
  const books = [
    {
      id: 1,
      title: "Книга 1",
      description: "Описание книги 1. Здесь рассказано о сюжете, авторе и жанре.",
      year: 2021,
      price: 450,
      image: "files/bestsellers/1.png"
    },
    {
      id: 2,
      title: "Книга 2",
      description: "Описание книги 2.  Здесь рассказано о сюжете, авторе и жанре.",
      year: 2022,
      price: 520,
      image: "files/bestsellers/2.png"
    },
    {
      id: 3,
      title: "Книга 3",
      description: "Описание книги 3.  Здесь рассказано о сюжете, авторе и жанре.",
      year: 2023,
      price: 390,
      image: "files/bestsellers/3.png"
    }
  ];

  // 3. Ищем нужную книгу
  const book = books.find(b => b.id === bookId);

  if (book) {
    $('#book-title').text(book.title);
    $('#book-description').text(book.description);
    $('#book-year').text(book.year);
    $('#book-price').text(book.price + ' ₽');
    $('#book-image').attr('src', book.image);

    $('#buy-btn').click(function () {
      alert(`Добавлено в корзину: ${book.title} за ${book.price} ₽`);
    });
  } else {
    $('main').html('<div class="text-center text-danger">Книга не найдена</div>');
  }
});
