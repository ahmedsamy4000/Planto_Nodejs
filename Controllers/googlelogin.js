function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
  }
  
  function googleAuth(req, res, next) {
    passport.authenticate('google', { scope: [ 'email', 'profile' ] })
}
  
  function googleCallback(req, res, next) {
    passport.authenticate( 'google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/google/failure'
      })  }
  
  function protectedRoute(req, res) {
    res.send(`Hello ${req.user.displayName}`);
  }
  
  function logout(req, res) {
    req.logout();
    req.session.destroy();
    res.send('Goodbye!');
  }
  
  function failure(req, res) {
    res.send('Failed to authenticate..');
  }
  
  module.exports = { googleAuth, googleCallback, protectedRoute, logout, failure };
  