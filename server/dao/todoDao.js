const Todo = require('../db/model/todo');
const user = require('../db/model/user');

getNewTodo = (todo) => {
    return new Todo(todo);
};

var insertTodo = (todo) => {
    var newTodo = getNewTodo(todo);
    return new Promise((resolve, reject) => {
        newTodo.save().then(docs => {
            resolve(docs);
        }, (err) => {
            reject(err);
        });
    });
};

var fetchAllTodos = (id) => {
    return new Promise((resolve, reject) => {
        Todo.find({
            _creator: id
        }).then((docs) => {
            resolve(docs);
        }, (err) => {
            reject(err);
        });
    });
};

var fetchTodoById = (id, userId) => {
    return new Promise((resolve, reject) => {
        Todo.findOne({
            _id: id,
            _creator: userId
        }).then((todo) => {
            resolve(todo);
        }, (err) => {
            reject(err);
        });
    });
};

var deleteTodoById = (id, userId) => {
    return new Promise((resolve, reject) => {
        Todo.findOneAndDelete({
            _id: id,
            _creator: userId
        }).then((todo) => {
            resolve(todo);
        }, (err) => {
            reject(err);
        });
    });
};

var updateTodoById = (id, userId, todo) => {
    return new Promise((resolve, reject) => {
        Todo.findOneAndUpdate({_id: id, _creator: userId}, {$set: todo}, {new: true}).then((todo) => {
            resolve(todo);
        },(err) => {
            reject(err);
        });
    });
};

module.exports = {
    insertTodo,
    fetchAllTodos,
    fetchTodoById,
    deleteTodoById,
    updateTodoById
}



