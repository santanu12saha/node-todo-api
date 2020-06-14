const mongoose = require('../mongo-db').getMongoose();
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

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

module.exports = userScheme;