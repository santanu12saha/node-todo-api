const mongoose = require('./mongoose-db-connector');
const dbUtils = require('./dbUtils');

const URL = process.env.MONGODB_URI;

var getMongoose = () => {
    return mongoose.getMongoose();
}

var getMongoDbClient = () => {
    return mongoose.connectionFactory(URL, dbUtils.options);
};

module.exports = {
    getMongoDbClient,
    getMongoose
}

