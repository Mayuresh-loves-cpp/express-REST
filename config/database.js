const mongoose = require('mongoose')

require('dotenv').config();

const conn = process.env.DB_STRING

module.exports = () => {
    mongoose.connect(conn, { useNewUrlParser: true, useUnifiedTopology: true })
    mongoose.connection.on("connected", () => {
        console.log("Database connected")
    })
}
