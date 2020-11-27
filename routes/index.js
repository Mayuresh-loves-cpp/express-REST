const router = require('express').Router()
const passport = require('passport')
const User = require('../models/Users')
const authController = require('../controllers/auth')
const indexController = require('../controllers/index')


router.post('/login', authController.login);
router.post('/register', authController.register)
router.get('/logout', authController.logout)
router.get('/', passport.authenticate('jwt', { session: false }), indexController.index)


module.exports = router;