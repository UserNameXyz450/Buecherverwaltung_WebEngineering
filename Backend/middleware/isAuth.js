const passport = require('passport');

//KI-generiert
const isAuth = passport.authenticate('jwt', {session: false});

module.exports = isAuth;