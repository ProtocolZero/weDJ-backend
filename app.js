require('dotenv').config();
// const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const express = require('express');


const song = require('./routes/song');
const playlist = require('./routes/playlist');

const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressSession = require('express-session');
const passport = require('./passport');
const facebook = require('./routes/facebook')

const playlistSong = require('./routes/playlist_song');

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'mouse dog',
  saveUninitialized: true,
  resave: false
}));
app.use(passport.initilaize());
app.use(passport.session());
// Routes
app.use('/playlist', playlist);
app.use('/playlist_song', playlistSong);

app.use('/song', song);

app.use('/facebook', facebook);


// Listening port
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Listening on port: ${PORT}`);
});
