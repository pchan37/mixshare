const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../database/models');
const bcrypt = require('bcrypt');

const customFields = {
  usernameField: 'username',
  passwordField: 'password',
};

const verifyCallback = (username, password, done) => {
  console.log('Verifying auth callback.');
  User.findOne({ username })
    .then((user) => {
      if (user) {
      } else {
        return done(null, false);
      }
      bcrypt.compare(password, user.password, function (err, res) {
        if (err) {
          return done(err);
        }
        if (res) {
          console.log('Found a user whose username and password matches.');
          return done(null, user);
        }
        console.log('No user found with the password.');
        return done(null, false);
      });
      return done(null, false);
    })
    .catch((err) => {
      console.log(
        `Encountered "${err.message}" while verifying auth callback.`
      );
      done(err);
    });
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  console.log(`Serializing user... ${JSON.stringify(user)}`);
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      console.log(`Deserialized user... ${JSON.stringify(user)}`);
      done(null, user);
    })
    .catch((err) => {
      console.log(`Encountered "${err.message}" while deserializing user.`);
      done(err);
    });
});
