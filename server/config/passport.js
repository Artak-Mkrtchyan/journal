import { Strategy as LocalStrategy } from 'passport-local';
import { model } from 'mongoose';
import { compare } from 'bcrypt';

import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: 'myPrivateKey',
  // issuer: 'accounts.examplesoft.com',
  // audience: 'yoursite.net',
};

import '../models/user';
const User = model('users');

export default function passportInit(passport) {
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

      compare(password, user.password, (err, isMatch) => {
        if(err) { throw err }
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Password Incorrect'});
        }
      });
    });
  }));
}
