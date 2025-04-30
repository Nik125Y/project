<script>
    $(document).ready(function () {
      $('.book-carousel').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 3000, // 3 секунды
  infinite: true,
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

    });
  
  // Массив книг (в будущем будет приходить с бэкенда)
  const books = [
    {
      id: 1,
      title: "Книга 1",
      price: "450 ₽",
      image: "files/bestsellers/1.png",
      link:  "index.html"
    },
    {
      id: 2,
      title: "Книга 2",
      price: "390 ₽",
      image: "files/bestsellers/2.png",
      link:  "index.html"
    },
    {
      id: 3,
      title: "Книга 3",
      price: "520 ₽",
      image: "files/bestsellers/3.png",
      link:  "index.html"
    },
    {
      id: 4,
      title: "Книга 4",
      price: "610 ₽",
      image: "files/bestsellers/4.png",
      link:  "index.html"
    },
    {
      id: 5,
      title: "Книга 5",
      price: "310 ₽",
      image: "files/bestsellers/5.png",
      link:  "index.html"
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
