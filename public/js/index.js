/* eslint-disable strict */
/* eslint-disable no-undef */
/* eslint-disable max-len */

(function() {
  'use strict';

  $(document).ready(() => {
    $('.modal').modal();
    const loginCheckOptions = {
      contentType: 'application/json',
      type: 'GET',
      url: '/token'
    };

    const updateHeader = () => {
      const username = localStorage.getItem('username');

      $('#loginButton').addClass('hide');
      $('#usernameLI').addClass('hide');
      $('#passwordLI').addClass('hide');
      $('#signUp').addClass('hide');

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
        const $tableBody = $('#leaderboardsBody');

        for (let i = 1; i <= leaderboardRows.length; i++) {
          const $tr = $('<tr>');
          const $tdRank = $('<td>');

          $tr.append($tdRank.text(i));
          let { time } = leaderboardRows[i - 1];
          const { username, levelId, difficulty } = leaderboardRows[i - 1];

          time /= 1000;
          const leaderBoardColumns = [time, username, levelId, difficulty];

          for (const elem in leaderBoardColumns) {
            const $td = $('<td>');

            $td.text(leaderBoardColumns[elem]);
            $tr.append($td);
          }
          $tableBody.append($tr);
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
        window.localStorage.setItem('username', body.username);
        window.location.href = '/index.html';
      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
      });
  });
})();
