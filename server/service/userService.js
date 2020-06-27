const userDao = require('../dao/userDao');

var saveUser = (userRequest) => {
    return new Promise((resolve, reject) => {
        userDao.insertUser(userRequest).then((result) => {
            resolve(result);
        }, (err) => {
            reject(err);
        });
    });
};

var getUserByToken = (token) => {
    return new Promise((resolve, reject) => {
        userDao.findUserByToken(token).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
};

var loginUserByCredentials = (body) => {
    return new Promise((resolve, reject) => {
        userDao.findUserByCredentials(body.email, body.password).then((result) => {
            resolve(result);
        }, (err) => {
            reject(err);
        });
    });
};

module.exports = {
    saveUser,
    getUserByToken,
    loginUserByCredentials
}