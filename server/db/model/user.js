const client = require('../mongo-db').getMongoDbClient(); 
const userSchema = require('../schema/userSchema');

var user = client.model('User', userSchema);
module.exports = user;