require('dotenv').config();
// const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const express = require('express');
<<<<<<< HEAD
var playlist = require('./routes/playlist.js')
var user = require('./routes/user.js')
=======

const playlist = require('./routes/playlist');
const playlistSong = require('./routes/playlist_song');

>>>>>>> c7fd004b3df41c69f462e689b83727c7d2237563
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
<<<<<<< HEAD
app.use('/user', user)
app.use('/playlist', playlist)
=======

// Routes
app.use('/playlist', playlist);
app.use('/playlist_song', playlistSong);
>>>>>>> c7fd004b3df41c69f462e689b83727c7d2237563

// Listening port
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Listening on port: ${PORT}`);
});
