'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/spaceRace_dev'
  },

  // test: {
  //   client: 'pg',
  //   connection: 'postgres://localhost/spaceRace_test'
  // },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
