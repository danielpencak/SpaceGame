/* eslint-disable no-extra-parens*/
'use strict';

module.exports.up = ((knex) => {
  return knex.schema.createTable('games', (table) => {
    table.increments();
    table.integer('player_id')
      .notNullable()
      .references('id')
      .inTable('players')
      .onDelete('CASCADE')
      .index();
    table.integer('level_id')
      .notNullable()
      .references('id')
      .inTable('levels')
      .onDelete('CASCADE')
      .index();
    table.integer('time').notNullable();
    table.integer('fuel_left').notNullable().default(0);
    table.timestamps(true, true);
  });
});

module.exports.down = ((knex) => {
  return knex.schema.dropTable('games');
});
