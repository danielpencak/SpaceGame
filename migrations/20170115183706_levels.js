/* eslint-disable no-extra-parens*/
'use strict';

module.exports.up = ((knex) => {
  return knex.schema.createTable('levels', (table) => {
    table.increments();
    table.string('level_name').notNullable();
    table.string('difficulty').notNullable();
    table.timestamps(true, true);
  });
});

module.exports.down = ((knex) => {
  return knex.schema.dropTable('levels');
});
