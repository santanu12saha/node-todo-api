const mongoose = require('../mongo-db').getMongoose();
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userScheme = new mongoose.Schema({
    email: {
        type: String,
        required:  [true, 'User email required'],
        trim: true,
        minlength: 1,
        unique: true,
        uniqueCaseInsensitive: true,
        validate: {
            validator:  validator.isEmail,
            message: props => `${props.value} is not a valid email.`
        }
    },
    password: {
        type: String,
        required: [true, 'User password required.'],
        minlength: 6,
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

userScheme.plugin(uniqueValidator, { message: 'User email already exists.'});

userScheme.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

userScheme.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    user.tokens.push({access, token});
    return new Promise((resolve, reject) => {
        user.save().then(() => {
            resolve(token);
        }).catch((err) => {
            reject(err);
        });
    });    
};

userScheme.statics.findByToken = function (token) {
    var user = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        return Promise.reject();
    }

    return user.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

userScheme.pre('save', function(next) {
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    }else{
        next();
    }
});

module.exports = userScheme;