/* eslint-disable no-extra-parens*/
/* eslint-disable camelcase */
/* eslint-disable line-comment-position*/
/* eslint-disable max-len */
'use strict';

module.exports.seed = ((knex) => {
  return knex('levels').del()
    .then(() => {
      return knex('levels').insert([{
        id: 1,
        level_name: 'too easy',
        difficulty: 'easy',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id: 2,
        level_name: 'too easy',
        difficulty: 'easier than easy',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw("SELECT setval('levels_id_seq', (SELECT MAX(id) FROM levels));"
      );
    });
});
