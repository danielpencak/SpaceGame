/* eslint-disable no-extra-parens*/
/* eslint-disable camelcase */
/* eslint-disable line-comment-position*/
/* eslint-disable max-len */
'use strict';

module.exports.seed = ((knex) => {
  return knex('games').del()
    .then(() => {
      return knex('games').insert([{
        id: 1,
        player_id: 1,
        level_id: 1,
        fuel_left: 30,
        time: 9000,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id: 2,
        player_id: 2,
        level_id: 2,
        fuel_left: 50,
        time: 9600,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id: 3,
        player_id: 1,
        level_id: 3,
        fuel_left: 30,
        time: 9000,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id: 4,
        player_id: 1,
        level_id: 4,
        fuel_left: 30,
        time: 9000,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id: 5,
        player_id: 1,
        level_id: 5,
        fuel_left: 30,
        time: 9000,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id: 6,
        player_id: 1,
        level_id: 6,
        fuel_left: 30,
        time: 9000,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw("SELECT setval('games_id_seq', (SELECT MAX(id) FROM games));"
      );
    });
});
