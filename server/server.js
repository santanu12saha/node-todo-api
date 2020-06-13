require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const todoService = require('./service/todoService');

const port = process.env.PORT;

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    todoService.saveTodo(req).then((todo) => {
        res.send(todo);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    todoService.getAllTodos().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    todoService.getTodoById(id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }, (err) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    todoService.removeTodoById(id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }, (err) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
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
    todoService.updateTodoById(id, body).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});        
    }, (err) => {
        res.status(400).send();
    });

});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = { app }; 