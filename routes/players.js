'use strict';

const bcrypt = require('bcrypt-as-promised');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/players', (req, res, next) => {
  const { username, password } = req.body;

  knex('players')
    .where('username', username)
    .first()
    .then((player) => {
      if (player) {
        return res.send(false);
      }

      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      const insertPlayer = { username, hashedPassword };

      return knex('players').insert(decamelizeKeys(insertPlayer), '*');
    })
    .then((rows) => {
      const player = camelizeKeys(rows[0]);
      const claim = { playerId: player.id };
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '7 days'
      });

      res.cookie('token', token, {
        httpOnly: true,
        secure: router.get('env') === 'production'
      });

      delete player.hashedPassword;

      res.send(player);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
