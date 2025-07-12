const passport = require('passport');

//KI-generiert
const isAuth = (req, res, next) => {
  
  // Now we call passport.authenticate within it
  passport.authenticate('jwt', { session: false })(req, res, next);
};

module.exports = isAuth;