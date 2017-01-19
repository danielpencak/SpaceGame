'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    username: Joi.string()
      .label('Username')
      .required()
      .min(3)
      .max(15)
      .trim(),

    password: Joi.string()
      .label('Password')
      .required()
      .trim()
      .min(8)
  }
};
