'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/games', (req, res, next) => {
  const { username, time } = req.body;

  knex('games')
    .innerJoin('players', 'players.id', 'games.player_id')
    .innerJoin('levels', 'levels.id', 'games.level_id')
    // .where('username', username)
    // .where('players.username', username)
    // .first()
    .then((rows) => {
      console.log(rows);
      const row = camelizeKeys(rows[0]);
      const { playerId } = row.id;
      const { levelId } = row.levelId;
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
