const express = require('express');
const _ = require('lodash');
const userRouter = express.Router();
const userService = require('../service/userService');
const {authenticate} = require('../middleware/authenticate');

userRouter.use((req, res, next) => {
    console.log(`User Api Request Time: ${req.originalUrl}`, new Date().toString());
    next();
});

userRouter.post('/', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    userService.saveUser(body).then((user) => {
        res.header('x-auth', user.token).send(user.user);
    }, (err) => {
        res.status(400).send(err);
    });
});

userRouter.get('/me', authenticate, (req, res) => {
    res.send(req.user);
});

userRouter.post('/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    userService.loginUserByCredentials(body).then((result) => {
        res.header('x-auth', result.token).send(result.user);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

module.exports = userRouter;