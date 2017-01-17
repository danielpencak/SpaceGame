$(document).ready(function(){
  $('.modal').modal();
  $('.scrollspy').scrollSpy();
});
$('.container').scroll(function (event) {
    var scroll = $('.container').scrollTop();
    console.log(scroll);
    if (scroll > 0) {
      $('.leaderboardsTitle').addClass('opaque');
    }
    else {
      $('.leaderboardsTitle').removeClass('opaque');
    }
});
