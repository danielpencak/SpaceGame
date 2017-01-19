'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/spaceRace_dev',
    seeds: {
      directory: './seeds/dev'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    seeds: {
      directory: './seeds/production'
    }
  }
};
