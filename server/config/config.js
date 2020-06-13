const dbUtils = require('../db/dbUtils');
var env = process.env.NODE_ENV || 'development';
if(env === 'development'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = dbUtils.url+"/"+dbUtils.dbName;
} else if(env === 'test'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = dbUtils.url+"/"+dbUtils.testdbName;
}