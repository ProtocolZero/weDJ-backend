require('dotenv').config();
// const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const expressSession = require('express-session');
const passport = require('./passport');
const cookieParser = require('cookie-parser');

// Route files
const user = require('./routes/user');
const song = require('./routes/song');
const playlist = require('./routes/playlist');
const facebook = require('./routes/facebook');
const playlistSong = require('./routes/playlist_song');
//const playlistUser = require('./routes/playlist_user')
const role = require('./routes/role');
const comment = require('./routes/comments');

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
  secret: 'mouse dog',
  saveUninitialized: true,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/facebook', facebook);
app.use('/playlist', playlist);
app.use('/playlist_song', playlistSong);
app.use('/playlist_user', playlistUser);
app.use('/song', song);
app.use('/role', role);
app.use('/user', user);
app.use('/comment', comment)

// Listening port
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Listening on port: ${PORT}`);
});
