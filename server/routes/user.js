const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');

const router = express.Router();

require('../models/user');
const User = mongoose.model('users');

// router.get('/login', (req, res) => {
//   res.render('user/login');
// });

// router.get('/logout', (req, res) => {
//   req.logout();
//   req.flash('success_msg', 'You are logged out');
//   res.redirect('login');
// })

router.post('/login',  (req, res, next) => {
  console.log('user/login');
  // passport.authenticate('local', {
  //   successRedirect:'/',
  //   failureRedirect: '/user/login',
  //   // failureFlash: true
  // })(req, res, next);

  passport.authenticate('local', function(err, user, info) {
    // console.log(err, user, info)
    if (err) { return next(err); }
    if (!user) {
      return res.send({ redirect: false });
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send({ redirect: true });
    });
  })(req, res, next);
});

// router.get('/register', (req, res) => {
//   res.render('user/register');
// });

router.post('/registration', (req, res) => {
  let errors = [];
  console.log(req.body);
  if (!req.body.name) {
    errors.push({text: 'Please enter a name'})
  }

  if (!req.body.email) {
    errors.push({text: 'Please enter a email'})
  }

  // if(req.body.password != req.body.password2){
  //   errors.push({text:'Passwords do not match'});
  // }
  //
  // if(req.body.password.length < 4){
  //   errors.push({text:'Password must be at least 4 characters'});
  // }
  //
  if (errors.length > 0) {
    res.render('user/register', {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    })
  } else {
    User.findOne({email: req.body.email})
    .then(user => {
      if(user) {
        req.flash('error_msg', 'Email already regsitered');
        // res.redirect('user/register');
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          articlesList: []
        });
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(newUser.password, salt, function(err, hash) {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
            .then(user => {
              req.flash('success_msg', 'You are now registered and can log in');
              // res.redirect('/user/login');
              console.log('redirect user/login')
            })
            .catch(err => {
              return;
            });
            });
        });

      }
    });
  }
})

module.exports = router;
