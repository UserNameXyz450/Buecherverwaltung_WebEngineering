const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            try {
                const {username, aboutYou} = req.body;

                if(!username) {
                    return done(null, false, {message: 'Username is required.'});
                }

                const existingUser = await User.findOne({email});

                if(existingUser) {
                    return done(null, false, {message: 'Email is already in use.'});
                }

                const newProfile = new User({
                    username,
                    email,
                    password,
                    aboutYou,
                    followers: 0
                });

                if(req.file) {
                    newProfile.profilePic = req.file.filename;
                }

                await newProfile.save();

                return done(null, newProfile);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            console.log("I am alive.");
            console.log(`searching for.-- : "${email}"`);
            try {
                const user = await User.findOne({ email: email });

                console.log("Found User: ", user);

                if(!user) {
                    return done(null, false, {message: 'User not found'});
                }

                const validate = await user.isValidPassword(password);

                if(!validate) {
                    return done(null, false, {message: 'Wrong password'});
                }

                return done(null, user, {message: 'Logged in succesfully'});
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);