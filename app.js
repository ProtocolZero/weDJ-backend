require('dotenv').config();
// const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const express = require('express');

const playlistSong = require('./routes/playlist_song');
const playlist = require('./routes/playlist');
const PORT = process.env.PORT || 3000;
const app = express();



// Middleware
app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/playlist_song', playlistSong);
app.use('/playlist', playlist);

// Listening port
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Listening on port: ${PORT}`);
});
