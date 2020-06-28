const express = require('express');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
const todoRouter = express.Router();
const todoService = require('../service/todoService');
const {authenticate} = require('../middleware/authenticate');

todoRouter.use((req, res, next) => {
    console.log(`Todo Api Request Time: ${req.originalUrl}`, new Date().toString());
    next();
});

todoRouter.post('/', authenticate, (req, res) => {
    todoService.saveTodo(req).then((todo) => {
        res.send(todo);
    }, (err) => {
        res.status(400).send(err);
    });
});

todoRouter.get('/', authenticate, (req, res) => {
    todoService.getAllTodos(req).then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

todoRouter.get('/:id', authenticate, (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    todoService.getTodoById(id, req.user._id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }, (err) => {
        res.status(400).send();
    });
});

todoRouter.delete('/:id', authenticate, (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    todoService.removeTodoById(id, req.user.id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }, (err) => {
        res.status(400).send();
    });
});

todoRouter.patch('/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }
    todoService.updateTodoById(id, req.user._id, body).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});        
    }, (err) => {
        res.status(400).send();
    });

});

module.exports = todoRouter;