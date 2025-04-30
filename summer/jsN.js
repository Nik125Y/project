<script>
  // Массив книг в будущем будет приходить с бэкенда
  const books = [
    {
      id: 1,
      title: "Книга 1",
      price: "450 ₽",
      image: "summer/files/bestseller/1.png",
      link: "#"
    },
    {
      id: 2,
      title: "Книга 2",
      price: "390 ₽",
      image: "https://via.placeholder.com/200x300?text=Книга+2",
      link: "#"
    },
    {
      id: 3,
      title: "Книга 3",
      price: "520 ₽",
      image: "https://via.placeholder.com/200x300?text=Книга+3",
      link: "#"
    },
    {
      id: 4,
      title: "Книга 4",
      price: "610 ₽",
      image: "https://via.placeholder.com/200x300?text=Книга+4",
      link: "#"
    },
    {
      id: 5,
      title: "Книга 5",
      price: "310 ₽",
      image: "https://via.placeholder.com/200x300?text=Книга+5",
      link: "#"
    }
  ];

  // Добавление книг в карусель
  $(document).ready(function () {
    books.forEach(book => {
      const bookHtml = `
        <div>
          <a href="${book.link}" class="text-decoration-none text-dark">
            <div class="card border-0">
              <img src="${book.image}" alt="${book.title}" class="book-cover card-img-top" />
              <div class="card-body p-2">
                <div class="book-title">${book.title}</div>
                <div class="book-price">${book.price}</div>
              </div>
            </div>
          </a>
        </div>
      `;
      $('.book-carousel').slick('slickAdd', bookHtml);
    });
  });
</script>
