/* eslint-disable strict */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable max-statements */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */

(() => {
  'use strict';

  $(document).ready(() => {
    localStorage.removeItem('currentLevel');
    $('.carousel').carousel();
    $('.modal').modal();
    $('#leaderboardsModal').modal({ dismissible: true });
    const loginCheckOptions = {
      contentType: 'application/json',
      type: 'GET',
      url: '/token'
    };

    const updateHeader = () => {
      const username = localStorage.getItem('username');

      const $logOutBTN = $('<button>').addClass('btn').attr('id', 'logout');

      $logOutBTN.text('Log Out');

      const $listRight = $('#headerList');
      const $listLeft = $('#headerListLeft');
      const $usernameLabel = $('<h3>').text(username).attr('id', 'userLabel');

      $listLeft.append($usernameLabel);
      $listRight.append($logOutBTN);
      $('#logout').on('click', () => {
        event.preventDefault();
        localStorage.clear();
        const logoutOptions = {
          contentType: 'application/json',
          type: 'DELETE',
          url: '/token'
        };

        $.ajax(logoutOptions)
          .done(() => {
            window.location.href = '/index.html';
          })
          .fail(($xhr) => {
            Materialize.toast($xhr.responseText, 3000);
          });
      });
    };

    $.ajax(loginCheckOptions)
      .done((loggedIn) => {
        if (loggedIn) {
          updateHeader();
        }
        else {
          $('#loginButton').removeClass('hide');
          $('#usernameLI').removeClass('hide');
          $('#passwordLI').removeClass('hide');
          $('#signUp').removeClass('hide');
        }
      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
      });

    const leaderboardOptions = {
      contentType: 'application/json',
      type: 'GET',
      url: '/leaderboards'
    };

    $.ajax(leaderboardOptions)
    .done((rows) => {
      const leaderboardRows = rows;
      const $tableBody = $('#leaderboardsBody').css('font-size', '30px');
      const $th = $('.tableHead');

      $th.css('font-size', '30px');
      let rank = 1;

      for (let i = 1; i <= leaderboardRows.length; i++) {
        const $tr = $('<tr>');
        const $tdRank = $('<td>');

        let { time } = leaderboardRows[i - 1];
        const { username, levelId, difficulty } = leaderboardRows[i - 1];

        $tr.addClass(levelId.toString());
        $tr.addClass('tableRow');
        $tr.css('border-top', '2px solid black');

        // change background color score belongs to signed in player
        if (username === localStorage.getItem('username')) {
          $tr.css('background-color', 'rgba(255, 58, 0, 0.2)');
        }

        // reset rank counter and add thicker border if it is the first rank for a level
        if (i === 1) {
          $tr.css('border-top', '5px solid black');
        }
        if (leaderboardRows[i - 2]) {
          if (leaderboardRows[i - 2].levelId !== levelId) {
            rank = 1;
            $tr.css('border-top', '5px solid black');
          }
        }
        $tr.append($tdRank.text(rank));

        time /= 1000;
        const leaderBoardColumns = [time, username, levelId, difficulty];

        for (const elem in leaderBoardColumns) {
          const $td = $('<td>');

          $td.text(leaderBoardColumns[elem]);
          if (elem == 2 || elem == 3) {
            $td.addClass('toHide');
          }
          $tr.append($td);
        }
        $tableBody.append($tr);
        rank++;
      }
    });
  });

  $('#signUpButton').on('click', (event) => {
    event.preventDefault();

    const username = $('#usernameSU').val().trim();

    localStorage.setItem('username', username);
    const password = $('#passwordSU').val().trim();
    const confirmPassword = $('#passwordConfirm').val().trim();

    if (!username) {
      return Materialize.toast('Username must not be blank', 3000);
    }

    if (username.length > 15 || username.length < 3) {
      return Materialize.toast('Username cannot be more than 15 characters or less than 3 characters', 3000);
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
      .done((body) => {
        if (body === false) {
          return Materialize.toast('Username already exits', 3000);
        }
        window.location.href = '/index.html';
      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
      });
  });

  $('#loginButton').on('click', (event) => {
    event.preventDefault();

    const username = $('#usernameLI').val().trim();
    const password = $('#passwordLI').val().trim();

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
      .done((body) => {
        if (body === false) {
          return Materialize.toast('Bad username or password', 3000);
        }
        window.localStorage.setItem('username', body.username);
        window.location.href = '/index.html';
      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
      });
  });

  $(document).ready(() => {
    if (window.location.href.indexOf('#leaderboardsModal') !== -1) {
      $('#leaderboardsModal').modal({ dismissible: true });
      $('#leaderboardsModal').css('display', 'block');
    }
  });

  $('#carousel1').on('click', () => {
    localStorage.setItem('currentLevel', 'level01');
  });
  $('#carousel2').on('click', () => {
    localStorage.setItem('currentLevel', 'level02');
  });
  $('#carousel3').on('click', () => {
    localStorage.setItem('currentLevel', 'level03');
  });
  $('#carousel4').on('click', () => {
    localStorage.setItem('currentLevel', 'level04');
  });
  $('#carousel5').on('click', () => {
    localStorage.setItem('currentLevel', 'level05');
  });
  $('#carousel6').on('click', () => {
    localStorage.setItem('currentLevel', 'level06');
  });

  $('#allButton').on('click', () => {
    $('.tableRow').removeClass('hide');
    $('.toHide').removeClass('hide');
  });

  $('#level1Button').on('click', () => {
    $('.tableRow').addClass('hide');
    $('.1').removeClass('hide');
    $('.toHide').addClass('hide');
  });

  $('#level2Button').on('click', () => {
    $('.tableRow').addClass('hide');
    $('.2').removeClass('hide');
    $('.toHide').addClass('hide');
  });

  $('#level3Button').on('click', () => {
    $('.tableRow').addClass('hide');
    $('.3').removeClass('hide');
    $('.toHide').addClass('hide');
  });

  $('#level4Button').on('click', () => {
    $('.tableRow').addClass('hide');
    $('.4').removeClass('hide');
    $('.toHide').addClass('hide');
  });

  $('#level5Button').on('click', () => {
    $('.tableRow').addClass('hide');
    $('.5').removeClass('hide');
    $('.toHide').addClass('hide');
  });

  $('#level6Button').on('click', () => {
    $('.tableRow').addClass('hide');
    $('.6').removeClass('hide');
    $('.toHide').addClass('hide');
  });
})();
