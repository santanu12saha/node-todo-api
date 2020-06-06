const mongoose = require('./mongoose-db-connector');
const dbUtils = require('./dbUtils');

const URL = process.env.MONGODB_ATLAS_URI || dbUtils.url+"/"+dbUtils.dbName;

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

