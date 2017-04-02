require('dotenv').config();

var passport = require('passport');
// const path = require('path');
var corsOptions = {
  origin: 'https://wedj-81dc5.firebaseapp.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const router = require('express').Router()
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

const user = require('./routes/user');
const song = require('./routes/song');
const index = require('./routes/index');
const playlist = require('./routes/playlist');
const playlistSong = require('./routes/playlist_song');
//const playlistUser = require('./routes/playlist_user')
const role = require('./routes/role');
const comment = require('./routes/comments');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors(corsOptions));

app.use(passport.initialize());
app.use(passport.session());
var Auth0Strategy = require('passport-auth0');
var strategy = new Auth0Strategy({
    domain:       process.env.AUTH0_DOMAIN,
    clientID:     process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:  process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    console.log('aaaaa')
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

passport.use(strategy);

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


var jwt = require('express-jwt');
// app.use(jwt({
//   secret: 'hello world !',
//   credentialsRequired: false,
//   getToken: function fromHeaderOrQuerystring (req) {
//     if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//         return req.headers.authorization.split(' ')[1];
//     } else if (req.query && req.query.token) {
//       return req.query.token;
//     }
//     return null;
//   }
// }));
app.use('/', index)
app.use('/playlist', playlist);
app.use('/playlist_song', playlistSong);

app.use('/song', song);
app.use('/role', role);
app.use('/user', user);
app.use('/comment', comment)

// Listening port
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Listening on port: ${PORT}`);
});
