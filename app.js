//uncomment statements in case if you need session and do not forget to add serialize and deserialize function in passport config file
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
var passport = require('passport');
var cors = require('cors');
var routes = require('./routes');
require('dotenv').config();

// const MongoStore = require('connect-mongo')(session)
const app = express()
app.use(cors());
const db = require('./config/database')()



app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// const sessionStore = new MongoStore({
// 	mongooseConnection: mongoose.connection,
// 	collection: 'sessions'
// })

// app.use(session({
// 	secret: process.env.SECRET,
// 	resave: false,
// 	saveUninitialized: true,
// 	store: sessionStore,
// 	cookie: {
// 		maxAge: 1000 * 60 * 60 * 24
// 	}
// }))
require('./config/passport')

app.use(passport.initialize());
// app.use(passport.session());
app.use(routes)

app.use(function (err, req, res, next) {
    console.log(err)
    res.status(500).json({ err })
})


app.listen(5000)
