module.exports = {
    index: (req, res, next) => {
        if(!req.isAuthenticated()){
            res.send(`Hello who are you`)
        }
        res.send(`Hello ${req.user}`)
    }
}