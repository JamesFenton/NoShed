process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
console.log("Running in env " + process.env.NODE_ENV);

var http = require('http');
// setup express
var express = require('express');
var app = express();

// set port
var port = process.env.PORT || '3000';
app.set('port', port);

// view engine setup
app.use(express.static('www'));

// create server
var server = http.createServer(app);
server.listen(port);

var addr = server.address();
var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
console.log("Server running at " + bind);