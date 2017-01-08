/* eslint-disable no-console */
/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
'use strict';

const express = require('express');
const app = express();

app.disable('x-powered-by');

app.use(express.static('hellophaser'));

app.use((_req, res, _next) => {
  return res.sendStatus(404);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
