$(document).ready(function(){
  $('.modal').modal();
});
$('.modal-content').scroll(function (event) {
    var scroll = $('.modal-content').scrollTop();
    console.log(scroll);
    if (scroll > 0) {
      $('.leaderboardsTitle').addClass('opaque');
    }
    else {
      $('.leaderboardsTitle').removeClass('opaque');
    }
});
