const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');

const router = express.Router();

require('../models/user');
const User = mongoose.model('users');

router.get('/login', (req, res) => {
  res.render('user/login');
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('login');
})

router.post('/login',  (req, res, next) => {
  passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect: '/user/login',
    failureFlash: true
  })(req, res, next);  
});

router.get('/register', (req, res) => {
  res.render('user/register');
});

router.post('/register', (req, res) => {
  let errors = [];

  if (!req.body.name) {
    errors.push({text: 'Please enter a name'})
  }

  if (!req.body.email) {
    errors.push({text: 'Please enter a email'})
  }

  if(req.body.password != req.body.password2){
    errors.push({text:'Passwords do not match'});
  }

  if(req.body.password.length < 4){
    errors.push({text:'Password must be at least 4 characters'});
  }

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
        res.redirect('user/register');
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(newUser.password, salt, function(err, hash) {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
            .then(user => {
              req.flash('success_msg', 'You are now registered and can log in');
              res.redirect('/user/login');
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