
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

(function() {
  'use strict';

  $(document).ready(function() {
    $('.modal').modal();
    // console.log(document.cookies);
    const options1 = {
      contentType: 'application/json',
      // data: JSON.stringify(document.cookie),
      // dataType: 'json',
      type: 'GET',
      url: '/token'
    };

    $.ajax(options1)
      .done((loggedIn) => {
        console.log('done');
        console.log(loggedIn);
        // window.location.href = '/index.html';
        // change header
        if (loggedIn) {
          console.log('loggedIn');
          $('#loginButton').addClass('hide');
          $('#usernameLI').addClass('hide');
          $('#passwordLI').addClass('hide');
          $('#signUp').addClass('hide');

          const $logOutBTN = $('<button>').addClass('btn').attr('id', 'logout');
          $logOutBTN.text('Log Out');

          const $listRight = $('#headerList');
          const $listLeft = $('#headerListLeft');
          // const $userLabel = $('#userLabel');

          $listRight.append($logOutBTN);
          // $userLabel.removeClass('hide');
        }
        else {
          $userLabel.addClass('hide')
        }
      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
        console.log('fail');
      });
  });

  $('#signUpButton').on('click', (event) => {
    event.preventDefault();

    const username = $('#usernameSU').val().trim();
    localStorage.setItem('username', username);
    console.log(username);
    const password = $('#passwordSU').val().trim();
    const confirmPassword = $('#passwordConfirm').val().trim();

    if (!username) {
      return Materialize.toast('Username must not be blank', 3000);
      }

    if (!password || password.length < 8) {
      return Materialize.toast(
        'Password must be at least 8 characters long', 3000);
    }

    if (password !== confirmPassword) {
      return Materialize.toast('Passwords do not match', 3000);
    }

    const options = {
      contentType: 'application/json',
      data: JSON.stringify({ username, password }),
      dataType: 'json',
      type: 'POST',
      url: '/players'
    };

    $.ajax(options)
      .done(() => {
        console.log('done');
        window.location.href = '/index.html';
        // change header

      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
        console.log('fail');
      });
  });

  $('#loginButton').on('click', (event) => {
    event.preventDefault();

    const username = $('#usernameLI').val().trim();
    const password = $('#passwordLI').val().trim();
    console.log(username);

    if (!username) {
      return Materialize.toast('Username must not be blank', 3000);
    }

    if (!password) {
      return Materialize.toast('Password must not be blank', 3000);
    }

    const options = {
      contentType: 'application/json',
      data: JSON.stringify({ username, password }),
      dataType: 'json',
      type: 'POST',
      url: '/token'
    };

    $.ajax(options)
      .done(() => {
        console.log('logged In Done');
        const $listLeft = $('#headerListLeft');
        const $usernameLabel = $('<h3>').text(req.body.username).attr('id', 'userLabel');

        $listLeft.append($usernameLabel);
        window.location.href = '/index.html';
      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
      });
  });

  $('#logout').on('click', (event) => {
    console.log('clicked logout');
    event.preventDefault();

    const options2 = {
      contentType: 'application/json',
      // data: JSON.stringify({ username, password }),
      // dataType: 'json',
      type: 'DELETE',
      url: '/token'
    };

    $.ajax(options2)
      .done(() => {
        console.log('logged out Done');
        window.location.href = '/index.html';
      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
      });
  });
})();
