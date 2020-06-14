const User = require('../db/model/user');

getNewUser = (user) => {
    return new User(user);
};

var insertUser = (user) => {
    var newUser = getNewUser(user);
    return new Promise((resolve, reject) => {
        newUser.save().then(docs => {
            resolve(docs);
        }, (err) => {
            reject(err);
        });
    });
};

module.exports = {
    insertUser
}