/* eslint-disable no-console */
/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
/* eslint-disable max-params */
'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();

app.disable('x-powered-by');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;

  case 'production':
    app.use(morgan('short'));
    break;

  default:
}

app.use(bodyParser.json());
app.use(cookieParser());

const path = require('path');

app.use(express.static(path.join('public')));

const players = require('./routes/players');
const token = require('./routes/token');
const games = require('./routes/games');
const leaderboards = require('./routes/leaderboards');

app.use(games);
app.use(players);
app.use(token);
app.use(leaderboards);

app.use((_req, res, _next) => {
  return res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  // Handle joi errors
  if (err.status) {
    return res.status(err.status).send(err);
  }

  // Handle boom errors
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  console.error(err.stack);
  // res.sendStatus(500);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
