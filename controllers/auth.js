const passport = require('passport');
const User = require('../models/Users')
const { issueJWT } = require('../utils/jwt');
module.exports = {
    login: (req, res, next) => {
        passport.authenticate('local',
            { session: false }, function (err, user, info) {
                try {
                    if (!user) {
                        res.status(401).json({ success: false, message: info.message })
                    } else {
                        const jwt = issueJWT(user)
                        res.status(200).json({ success: true, user: user._id, token: jwt.token, expiresIn: jwt.expires })
                    }
                } catch (err) {
                    return next(err)
                }
            })(req, res, next);
    },
    register: async (req, res, next) => {
        try {
            const { email, password, firstName, lastName } = req.body
            const userObj = new User({ email, password, firstName, lastName })
            let result = await userObj.save()
            const jwt = issueJWT(result)
            res.json({ success: true, user: result._id, token: jwt.token, expiresIn: jwt.expires })
        } catch (err) {
            console.error(err);
            return next(err)
        }
    },
    logout: (req, res, next) => {
        req.logout();
        res.redirect('/');
    }
}

