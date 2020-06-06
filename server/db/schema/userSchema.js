const mongoose = require('../mongo-db').getMongoose();

const userScheme = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

module.exports = userScheme;