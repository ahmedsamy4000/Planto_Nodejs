// auth.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;



passport.use(new GoogleStrategy({
  clientID: this.env.GOOGLE_CLIENT_ID,
  clientSecret: this.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:7500/api/google/auth/google/callback",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
module.exports = passport;
