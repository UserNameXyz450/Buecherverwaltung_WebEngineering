const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get(
    '/profile',
    passport.authenticate('jwt', {session: false}),
    (req, res, next) => {
        res.json({
            message: 'You made it to the secure route',
            user: req.user,
        });
    }
);

module.exports = router;