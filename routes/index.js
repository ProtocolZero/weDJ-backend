
var express = require('express');
var passport = require('passport');
var router = express.Router();
router.get('/login',
  function(req, res){
    res.redirect('http://localhost:5000/');
  });

// Perform session logout and redirect to homepage
router.get('/logout', function(req, res){
  req.logout();
  console.log(req.user)
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to '/user'
router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: 'http://wedj-youtube.firebaseapp.com/' }),
  function(req, res) {
    console.log(req.user)
    res.redirect(req.session.returnTo || 'https://wedj-youtube.firebaseapp.com/dashboard.html');
  });
module.exports = router
