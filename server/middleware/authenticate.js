const userService = require('../service/userService');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    userService.getUserByToken(token).then((user) => {
        if(!user){
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    }, (err) => {
        res.status(401).send();
    });
};

module.exports = {authenticate}