$(document).ready(function() {
  var num = $('.counter').text();
  $('textarea').on('input', function(ev) {
    var inputLength = ev.target.value.length;
    var finalNum = num - inputLength;
    $(this).siblings('.counter').html(finalNum);
    if (finalNum < 0) {
      $(this).siblings('.counter').addClass('setRed');
    } else {
      $(this).siblings('.counter').removeClass('setRed');
    }
  });
});