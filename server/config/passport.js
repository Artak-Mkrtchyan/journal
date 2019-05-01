const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: 'myPrivateKey',
  // issuer: 'accounts.examplesoft.com',
  // audience: 'yoursite.net',
}

require('../models/user');
const User = mongoose.model('users');

module.exports = function (passport) {
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload.id}, function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
  }));

  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
  (email, password, done) => {
    User.findOne({ email: email }).then(user => {
      if(!user) {
        return done(null, false, {message: 'No User Found'});
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Password Incorrect'});
        }
      });
    })
  }));
}
