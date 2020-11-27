const fs = require('fs')
const path = require('path')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/Users')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const pathToPubKey = path.join(__dirname, '..', 'keys', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf-8')


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithm: ['RS256']
}

passport.use(new JwtStrategy(options, function (jwt_payload, done) {
    User.findOne({ _id: jwt_payload.sub }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user._id);
        } else {
            return done(null, false);
        }
    });
}));


passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ email: username }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            user.validPassword(password, user.password).then(valid => {
                if (!valid) {
                    return done(null, false, { message: 'Incorrect password.' });
                } else {
                    console.log("correct password")
                    return done(null, user);
                }
            })
        });
    }
));
