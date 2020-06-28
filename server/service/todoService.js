const todoDao = require('../dao/todoDao');

var saveTodo = (todoRequest) => {
    var todo = {
        text: todoRequest.body.text,
        _creator: todoRequest.user._id
    };
    return new Promise((resolve, reject) => {
        todoDao.insertTodo(todo).then((result) => {
            resolve(result);
        }, (err) => {
            reject(err);
        });
    });
};

var getAllTodos = (req) => {
    return new Promise((resolve, reject) => {
        todoDao.fetchAllTodos(req.user._id).then((result) => {
            resolve(result);
        }, (err) => {
            reject(err);
        });
    });
};

var getTodoById = (id, userId) => {
    return new Promise((resolve, reject) => {
        todoDao.fetchTodoById(id, userId).then((result) => {
            resolve(result);
        }, (err) => {
            reject(err);
        });
    });
};

var removeTodoById = (id, userId) => {
    return new Promise((resolve, reject) => {
        todoDao.deleteTodoById(id, userId).then((result) => {
            resolve(result);
        }, (err) => {
            reject(err);
        });
    });
};

var updateTodoById = (id, userId, todo) => {
    return new Promise((resolve, reject) => {
        todoDao.updateTodoById(id, userId, todo).then((result) => {
            resolve(result);
        }, (err) => {
            reject(err);
        })
    });
};

module.exports = {
    saveTodo,
    getAllTodos,
    getTodoById,
    removeTodoById,
    updateTodoById
}
