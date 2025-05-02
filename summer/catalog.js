// Вывод книг в каталог
$(document).ready(function() {
  // --- Вспомогательные функции для фильтров ---
  function getUnique(arr, key) {
    return [...new Set(arr.map(item => item[key]))].filter(Boolean);
  }

  // --- Рендер фильтров ---
  function renderFilters() {
    // Жанры
    const genres = getUnique(books, 'genre');
    const $genre = $('#filter-genre');
    $genre.empty();
    genres.forEach(genre => {
      $genre.append(`<div class="form-check"><input class="form-check-input genre-filter" type="checkbox" value="${genre}" id="genre-${genre}"><label class="form-check-label" for="genre-${genre}">${genre}</label></div>`);
    });
    // Авторы
    const authors = getUnique(books, 'author');
    const $author = $('#filter-author');
    $author.empty();
    authors.forEach(author => {
      $author.append(`<div class="form-check"><input class="form-check-input author-filter" type="checkbox" value="${author}" id="author-${author}"><label class="form-check-label" for="author-${author}">${author}</label></div>`);
    });
    // Годы
    const years = getUnique(books, 'year').sort((a, b) => a - b);
    const $year = $('#filter-year');
    $year.empty();
    if (years.length) {
      $year.append(`<div class="d-flex align-items-center gap-2"><input type="number" class="form-control form-control-sm year-filter" id="year-from" placeholder="от" min="${years[0]}" max="${years[years.length-1]}" style="width:70px;"> <span>-</span> <input type="number" class="form-control form-control-sm year-filter" id="year-to" placeholder="до" min="${years[0]}" max="${years[years.length-1]}" style="width:70px;"></div>`);
    }
  }

  // --- Получение выбранных фильтров ---
  function getSelectedFilters() {
    const selectedGenres = $('.genre-filter:checked').map(function() { return $(this).val(); }).get();
    const selectedAuthors = $('.author-filter:checked').map(function() { return $(this).val(); }).get();
    const yearFrom = parseInt($('#year-from').val());
    const yearTo = parseInt($('#year-to').val());
    return { selectedGenres, selectedAuthors, yearFrom, yearTo };
  }

  // --- Получение поискового запроса ---
  function getSearchQuery() {
    return $("input[type='search']").val().trim().toLowerCase();
  }

  // --- Фильтрация книг ---
  function filterBooks() {
    const { selectedGenres, selectedAuthors, yearFrom, yearTo } = getSelectedFilters();
    const search = getSearchQuery();
    return books.filter(book => {
      let genreOk = !selectedGenres.length || selectedGenres.includes(book.genre);
      let authorOk = !selectedAuthors.length || selectedAuthors.includes(book.author);
      let yearOk = true;
      if (!isNaN(yearFrom)) yearOk = book.year >= yearFrom;
      if (!isNaN(yearTo)) yearOk = yearOk && book.year <= yearTo;
      let searchOk = true;
      if (search) {
        searchOk = (book.title && book.title.toLowerCase().includes(search)) ||
                   (book.author && book.author.toLowerCase().includes(search));
      }
      return genreOk && authorOk && yearOk && searchOk;
    });
  }

  // --- Генерация карточек книг ---
  function renderBooks(filteredBooks) {
    const $container = $('#catalog-books');
    $container.empty();
    if (!filteredBooks.length) {
      $container.append('<div class="text-muted text-center py-5">Нет книг по выбранным фильтрам</div>');
      return;
    }
    filteredBooks.forEach(book => {
      const bookHtml = `
        <div class="col-md-4 col-sm-6 mb-4">
          <div class="card h-100 book-card" data-id="${book.id}" style="cursor:pointer;">
            <img src="${book.image}" alt="${book.title}" class="book-cover card-img-top" />
            <div class="card-body d-flex flex-column">
              <div class="book-title mb-1">${book.title}</div>
              <div class="text-muted mb-2">${book.author || ''}</div>
              <div class="book-price mb-2">${book.price} ₽</div>
              <button class="btn btn-outline-primary mt-auto w-100 buy-btn" data-id="${book.id}">Купить</button>
            </div>
          </div>
        </div>
      `;
      $container.append(bookHtml);
    });
  }

  // --- Добавление книги в корзину ---
  function addToCart(bookId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const book = books.find(b => b.id === bookId);
    if (book) {
      cart.push({
        id: book.id,
        title: book.title,
        price: book.price,
        image: book.image
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartTotal();
    }
  }

  // --- Обновление суммы в корзине ---
  function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + parseInt(item.price), 0);
    $('#cart-total').text(`${total} ₽`);
  }

  // --- События фильтров и поиска ---
  $(document).on('change', '.genre-filter, .author-filter, .year-filter', function() {
    renderBooks(filterBooks());
  });
  $(document).on('input', '#year-from, #year-to', function() {
    renderBooks(filterBooks());
  });
  $(document).on('input', "input[type='search']", function() {
    renderBooks(filterBooks());
  });

  // --- Обработчик кнопки "Купить" ---
  $(document).on('click', '.buy-btn', function(e) {
    e.stopPropagation();
    const bookId = parseInt($(this).data('id'));
    addToCart(bookId);
  });

  // --- Переход на страницу книги ---
  $(document).on('click', '.book-card', function(e) {
    if (!$(e.target).hasClass('buy-btn')) {
      const bookId = $(this).data('id');
      window.location.href = `book.html?id=${bookId}`;
    }
  });

  // --- Инициализация ---
  renderFilters();
  renderBooks(books);
  updateCartTotal();
}); 