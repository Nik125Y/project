$(document).ready(function() {
  const $loginForm = $('#login-form');
  const $registerForm = $('#register-form');
  const $toggle = $('#toggle-auth');
  const $title = $('#auth-title');

  $toggle.on('click', function(e) {
    e.preventDefault();
    if ($loginForm.is(':visible')) {
      $loginForm.hide();
      $registerForm.show();
      $title.text('Регистрация');
      $registerForm.prepend('<p class="form-info">Уже есть аккаунт?</p>');
      $toggle.text('Войти');
    } else {
      $registerForm.hide();
      $loginForm.show();
      $title.text('Вход');
      $loginForm.prepend('<p class="form-info">Нет аккаунта?</p>');
      $toggle.text('Зарегистрироваться');
    }
  });
}); 
