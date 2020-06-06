const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var connectionFactory = (MONGODB_URI, OPTIONS) => {
    return mongoose.createConnection(MONGODB_URI, OPTIONS); 
};

var getMongoose = () => {
    return mongoose;
}

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log("Mongoose default connection is disconnected due to application termination");
       process.exit(0);
    });
});

module.exports = {
    connectionFactory,
    getMongoose
};