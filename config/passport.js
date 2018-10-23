const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')

const Users = mongoose.model('Users')

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, function(email, password, done) {
  User.findOne({email: email}).then(function(user){
    if(!user || !user.validPassword(password)){
      return done(null, false, {errors: {'email or password': 'is invalid'}});
    }

    return done(null, user);
  }).catch(done);
}));


// passport.use(new LocalStrategy({
//   usernameField: 'user[email]',
//   passwordField: 'user[password]'
// }, function(email, password, done) {
//   User.findOne({email: email}).then(function(user){
//     if(!user || !user.validPassword(password)){
//       return done(null, false, {errors: {'email or password': 'is invalid'}});
//     }
//
//     return done(null, user);
//   }).catch(done);
// }));
