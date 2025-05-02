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
      $toggle.text('Уже есть аккаунт? Войти');
    } else {
      $registerForm.hide();
      $loginForm.show();
      $title.text('Вход');
      $toggle.text('Нет аккаунта? Зарегистрироваться');
    }
  });
}); 