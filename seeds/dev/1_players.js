/* eslint-disable no-extra-parens*/
/* eslint-disable camelcase */
/* eslint-disable line-comment-position*/
/* eslint-disable max-len */
'use strict';

module.exports.seed = ((knex) => {
  return knex('players').del()
    .then(() => {
      return knex('players').insert([{
        id: 1,
        username: 'dan',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',  // youreawizard
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id: 2,
        username: 'will',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',  // youreawizard
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw("SELECT setval('players_id_seq', (SELECT MAX(id) FROM players));"
      );
    });
});
