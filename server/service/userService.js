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

module.exports = {
    saveUser
}