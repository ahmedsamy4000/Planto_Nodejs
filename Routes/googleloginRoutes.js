// routes/googleRoutes.js
const express = require('express');
const router = express.Router();
const passport = require('../MiddleWares/googleauth'); 


router.get('/',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] })
);

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
);

module.exports = router;
