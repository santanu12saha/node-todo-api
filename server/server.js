require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const todosRoute = require('./route/todos-route');
const usersRoute = require('./route/users-route');

const port = process.env.PORT;

var app = express();

app.use(bodyParser.json());
app.use('/todos', todosRoute);
app.use('/users', usersRoute);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = { app }; 