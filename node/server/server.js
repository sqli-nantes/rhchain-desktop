var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var usersRouter = require('./routes/users');
var questionsRouter = require('./routes/questions');

// Déclaration de l'application
var app = express();
var port = 8000;

// configure app to use bodyParser()
// this will let us get the data from a POST
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api/resources
app.use('/api/questions', questionsRouter);
app.use('/api/users',usersRouter);
app.listen(port);
