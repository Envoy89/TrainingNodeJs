const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;
const bcrypt = require('bcrypt');

const secret = require('./keys').secret;

const UserModel = require('../model/User');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
}, async (username, password, done) => {
    try {
        const userDocument = await UserModel.findOne({username: username}).exec();
        const passwordMatch = await bcrypt.compare(password, userDocument.passwordHash);

        if (passwordMatch) {
            return done(null, userDocument);
        } else {
            return done('Incorrect Username / password');
        }
    } catch(error) {
        done(error);
    }
}));

passport.use(new JwtStrategy({
    jwtFromRequest: req => req.cookies.jwt,
    secretOrKey: secret,
}, (jwtPayload, done) => {
    if (Date.now() > jwtPayload.expires) {
        return done('jwt expired');
    }

    return done(null, jwtPayload);
}))
