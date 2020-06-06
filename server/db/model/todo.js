const client = require('../mongo-db').getMongoDbClient(); 
const todoSchema = require('../schema/todoSchema');

var todo = client.model('Todo', todoSchema);
module.exports = todo;