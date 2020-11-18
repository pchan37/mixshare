const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Account } = require('../database/models');
const bcrypt = require('bcrypt');

const customFields = {
  usernameField: 'username',
  passwordField: 'password',
};

const verifyCallback = (username, password, done) => {
  console.log('Verifying auth callback.');
  Account.findOne({ username }, async (err, user) => {
    console.log(`Found user: ${user}`);
    if (user === undefined || user === null) {
      return done(null, false, {
        message: 'Incorrect username or password.',
      });
    }
    try {
      const doesPasswordMatch = await bcrypt.compare(password, user.password);
      if (doesPasswordMatch) {
        console.log('Found a user whose username and password matches.');
        return done(null, user, {
          message: 'Successful login!',
        });
      } else {
        console.log('No user found with the password.');
        return done(null, false, {
          message: 'Incorrect username or password.',
        });
      }
    } catch (err) {
      return done(err);
    }
  });
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  console.log(`Serializing user... ${JSON.stringify(user)}`);
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  Account.findById(userId)
    .then((user) => {
      console.log(`Deserialized user... ${JSON.stringify(user)}`);
      done(null, user);
    })
    .catch((err) => {
      console.log(`Encountered "${err.message}" while deserializing user.`);
      done(err);
    });
});
