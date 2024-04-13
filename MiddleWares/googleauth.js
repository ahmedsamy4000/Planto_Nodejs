// auth.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = '528390125867-5qnc6mlp87pgajdunolri04goq1t4ial.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET ='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'

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
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
