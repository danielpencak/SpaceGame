/* eslint-disable no-extra-parens */
/* eslint-disable max-len */

'use strict';

const express = require('express');
const knex = require('../knex');
const { camelizeKeys } = require('humps');
const boom = require('boom');
const jwt = require('jsonwebtoken');

// eslint-disable-next-line new-cap
const router = express.Router();

const authorize = ((req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err) => {
    if (err) {
      return res.send(false);
    }

    // res.send(true);
    next();
  });
});

router.post('/games', authorize, (req, res, next) => {
  const { username, time, levelId } = req.body;

  knex('players')
    .where('username', username)
    .first()
    .then((row) => {
      const playerId = row.id;

      return playerId;
    })
    .then((playerId) => {
      return knex('games').insert({
        player_id: playerId,
        level_id: levelId,
        time: time
      }, '*');
    })
    .then((newRow) => {
      res.send(camelizeKeys(newRow));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
