process.env.NODE_ENV = process.env.NOSHED_ENV || 'local';
console.log("Running in env " + process.env.NODE_ENV);

// setup express
var express = require('express');
var app = express();
// setup DB
var mongoose = require('./config/mongoose');
var db = mongoose();

// serve static pages in ./www
app.use('/', express.static(__dirname + '/www'));

// routes
var status = require('./routes/status');
app.use('/status', status);

var areas = require('./routes/areas');
app.use('/areas', areas);

var schedule = require('./routes/schedule');
app.use('/schedule', schedule);

module.exports = app;