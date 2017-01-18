'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/players', (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !username.trim()) {
    return next(boom.create(400, 'Username must not be blank'));
  }

  if (!password || password.length < 8) {
    return next(boom.create(400, 'Password must be at least characters long'));
  }

  knex('players')
    .where('username', username)
    .first()
    .then((player) => {
      if (player) {
        throw boom.create(400, 'Username already exists');
      }

      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      const insertPlayer = { username, hashedPassword };

      return knex('players').insert(decamelizeKeys(insertPlayer), '*');
    })
    .then((rows) => {
      const player = camelizeKeys(rows[0]);
      // const claim = { playerId: player.id };
      // const token = jwt.sign(claim, process.env.JWT_KEY, {
      //   expiresIn: '7 days'
      // });
      //
      // res.cookie('token', token, {
      //   httpOnly: true,
      //   secure: router.get('env') === 'production'
      // });

      delete player.hashedPassword;

      res.send(player);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
