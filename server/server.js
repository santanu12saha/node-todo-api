var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var todoService = require('./service/todoService');

const port = process.env.PORT || 3000;

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

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = { app }; 