const todoDao = require('../dao/todoDao');

var saveTodo = (todoRequest) => {
    var todo = {
        text: todoRequest.body.text
    };
    return new Promise((resolve, reject) => {
        todoDao.insertTodo(todo).then((result) => {
            resolve(result);
        }, (err) => {
            reject(err);
        });
    });
};

var getAllTodos = () => {
    return new Promise((resolve, reject) => {
        todoDao.fetchAllTodos().then((result) => {
            resolve(result);
        }, (err) => {
            reject(err);
        });
    });
};

var getTodoById = (id) => {
    return new Promise((resolve, reject) => {
        todoDao.fetchTodoById(id).then((result) => {
            resolve(result);
        }, (err) => {
            reject(err);
        });
    });
};

var removeTodoById = (id) => {
    return new Promise((resolve, reject) => {
        todoDao.deleteTodoById(id).then((result) => {
            resolve(result);
        }, (err) => {
            reject(err);
        });
    });
};

var updateTodoById = (id, todo) => {
    return new Promise((resolve, reject) => {
        todoDao.updateTodoById(id, todo).then((result) => {
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
