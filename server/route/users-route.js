const express = require('express');
const _ = require('lodash');
const userRouter = express.Router();
const userService = require('../service/userService');

userRouter.use((req, res, next) => {
    console.log(`User Api Request Time: ${req.originalUrl}`, new Date().toString());
    next();
});

userRouter.post('/', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    userService.saveUser(body).then((user) => {
        res.send(user);
    }, (err) => {
        res.status(400).send(err);
    });
});

module.exports = userRouter;