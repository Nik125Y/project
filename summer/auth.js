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
      $toggle.text('Войти');
    } else {
      $registerForm.hide();
      $loginForm.show();
      $title.text('Вход');
      $toggle.text('Зарегистрироваться');
    }
  });
}); 
