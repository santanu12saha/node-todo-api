const User = require('../db/model/user');

getNewUser = (user) => {
    return new User(user);
};

var insertUser = (user) => {
    var newUser = getNewUser(user);
    return new Promise((resolve, reject) => {
        newUser.save().then(() => {
            return newUser.generateAuthToken();
        }).then((token) => {
            resolve({user: newUser, token});
        }).catch((err) => {
            reject(err);
        });
    });
};

var findUserByToken = (token) => {
    return new Promise((resolve, reject) => {
        User.findByToken(token).then((user) => {
            resolve(user);
        }).catch((err) => {
            reject(err);
        });
    });
};

module.exports = {
    insertUser,
    findUserByToken
}