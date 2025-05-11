$(document).ready(function() {
  const $loginForm = $('#login-form');
  const $registerForm = $('#register-form');
  const $toggle = $('#toggle-auth');
  const $title = $('#auth-title');
  const $welcomeText = $('#welcome-text');
  const $registerText = $('#register-text');

  $toggle.on('click', function(e) {
    e.preventDefault();
    if ($loginForm.is(':visible')) {
      $loginForm.hide();
      $registerForm.show();
      $title.text('Регистрация');
      $toggle.text('Войти');
       $welcomeText.hide();
      $registerText.show();
    } else {
      $registerForm.hide();
      $loginForm.show();
      $title.text('Вход');
      $toggle.text('Зарегистрироваться');
       $registerText.hide();
      $welcomeText.show();
    }
  });
}); 
