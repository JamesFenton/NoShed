process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
console.log("Running in env " + process.env.NODE_ENV);

// setup express
var express = require('express');
var app = express();
// setup DB
var mongoose = require('./config/mongoose');
var db = mongoose();
var http = require('http');

// set port
var port = process.env.PORT || '3000';
app.set('port', port);

// view engine setup
app.use(express.static('www'));

// routes
var index = require('./routes/index');
app.use('/', index);

var status = require('./routes/status');
app.use('/status', status);

// create server
var server = http.createServer(app);
server.listen(port);

var addr = server.address();
var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
console.log("Server running at " + bind);