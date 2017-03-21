const passport = require('../passport');
const router = require('express').Router();

// router.get('/',
//   function(req, res) {
//     res.render('home', { user: req.user });
//   });
//
// router.get('/login',
//   function(req, res){
//     res.render('login');
//   });

router.get('/login/facebook',
  passport.authenticate('facebook'));

router.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
//
// router.get('/profile',
//   require('connect-ensure-login').ensureLoggedIn(),
//   function(req, res){
//     res.render('profile', { user: req.user });
//   });
