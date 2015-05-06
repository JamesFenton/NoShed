process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
console.log("Running in env " + process.env.NODE_ENV);

// setup express
var express = require('express');
var app = express();
// setup DB
var mongoose = require('./config/mongoose');
var db = mongoose();

// serve static pages in ./www
app.use(express.static('./www'));

// routes
var status = require('./routes/status');
app.use('/status', status);

module.exports = app;