const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');

const jwt = require('jsonwebtoken');

const router = express.Router();

require('../models/user');
const User = mongoose.model('users');

router.get('/logout', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // req.logout();
    jwt.sign({ email: 'artak6297@gmail.com' }, 'myPrivateKey', function(err, token) {
      console.log(token);
      res.send({ token })
    });
    return res.send({msg: 'logout'});
})

router.post('/login',  (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      return res.send({ redirect: 'user/login' });
    }
    // console.log('user/login', user);
    let { id, name, email } = user;
    jwt.sign({ id, name, email }, 'myPrivateKey', function(err, token) {
      console.log(token);
      res.send({ user, token })
    });
  })(req, res, next);
});

// router.get('/registration', (req, res) => {
//   res.redirect('user/login');
// })

router.post('/registration', (req, res) => {
  User.findOne({email: req.body.email})
  .then(user => {
    if(user) {
      return res.send({ redirect: 'user/registration', error: 'The email address is already in use by another account.' });
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
            console.log('redirect user/login');
            return res.send({ redirect: 'user/login' });
          })
          .catch(err => {
            return err;
          });
          });
      });

    }
  });
})

module.exports = router;
