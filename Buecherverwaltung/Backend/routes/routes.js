const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const upload = require('../middleware/upload');

const router = express.Router();

router.post(
    '/signup',
    upload.single('profilePic'),
    passport.authenticate('signup', {session: false}),
    async (req, res) => {
        res.json({
            message: 'Signup succesful',
            user: req.user
        });
    }
);

router.post(
    '/login',
    async(req, res, next) => {
        console.log("Bro, I reached this!!");
        console.log(req.body);
        passport.authenticate(
            'login',
            async(err, user, info) => {
                try {
                    if(err || !user) {
                        const error = new Error('An error occured.');

                        return next(error);
                    }

                    req.login(
                        user,
                        {session: false},
                        async(error) => {
                            if(error) return next(error);

                            const body = {_id: user._id, email: user.email, username: user.username, profilePic: user.profilePic};
                            const token = jwt.sign({user: body}, 'TOP_SECRET');

                            return res.json({ token });
                        }
                    );
                } catch (error) {
                    return next(error);
                }
            }
        )(req, res, next);
    }
);

module.exports = router;