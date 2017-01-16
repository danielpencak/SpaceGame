/* eslint-disable no-extra-parens*/
'use strict';

module.exports.up = ((knex) => {
  return knex.schema.createTable('players', (table) => {
    table.increments();
    table.string('username').unique().notNullable();
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.timestamps(true, true);
  });
});

module.exports.down = ((knex) => {
  return knex.schema.dropTable('players');
});
