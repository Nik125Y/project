$(document).ready(function() {
  $('.btn-profile-menu').on('click', function() {
    $('.btn-profile-menu').removeClass('active');
    $(this).addClass('active');
    var section = $(this).data('section');
    $('.profile-section').hide();
    $('#' + section).show();
  });
}); 