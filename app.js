require('dotenv').config();
// const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const express = require('express');
var playlist = require('./routes/playlist.js')
var user = require('./routes/user.js')
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', user)
app.use('/playlist', playlist)

// Listening port
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Listening on port: ${PORT}`);
});
