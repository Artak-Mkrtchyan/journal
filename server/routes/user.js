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
    jwt.sign({ email: 'artak6297@gmail.com' }, 'myPrivateKey', function(err, token) {
      res.send({ token })
    });
    return res.send({msg: 'logout'});
});

router.post('/login',  (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send({ userInfo: false, info });
    }

    let { id, name, email } = user;
    jwt.sign({ id, name, email }, 'myPrivateKey', function(err, token) {
      res.send({ userInfo: { id, name, email, token }});
    });
  })(req, res, next);
});

router.post('/registration', (req, res) => {
  User.findOne({email: req.body.email})
  .then(user => {
    if(user) {
      return res.send({ isRegistered: false });
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
            return res.send({ isRegistered: true });
          })
          .catch(err => {
            return err;
          });
          });
      });

    }
  });
});

router.post('/refresh', passport.authenticate('jwt', { session: false }), (req, res) => {
  let token = req.body.token;
  let { _id: id, name, email } = req.user;
  return res.send({ id, name, email, token });
});

module.exports = router;
