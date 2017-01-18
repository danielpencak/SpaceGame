'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/token', (req, res) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, _payload) => {
    if (err) {
      return res.send(false);
    }

    res.send(true);
  });
});

router.post('/token', (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !username.trim()) {
    return next(boom.create(400, 'Username must not be blank'));
  }

  if (!password || !password.trim()) {
    return next(boom.create(400, 'Password must not be blank'));
  }

  let player;

  knex('players')
    .where('username', username)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(400, 'Bad username or password');
      }

      player = camelizeKeys(row);

      return bcrypt.compare(password, player.hashedPassword);
    })
    .then(() => {
      const claim = { playerId: player.id };
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '7 days'  // Adds an exp field to the payload
      });

      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),  // 7 days
        secure: router.get('env') === 'production'  // Set from the NODE_ENV
      });

      delete player.hashedPassword;

      res.send(player);
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      throw boom.create(400, 'Bad username or password');
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/token', (req, res) => {
  // Clear token cookie
  res.clearCookie('token');
  res.send({ success: true });
});

module.exports = router;
