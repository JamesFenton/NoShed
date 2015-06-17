var app = require('./app');
var http = require('http');

var port = process.env.PORT || '3000';
app.set('port', port);

var server = http.createServer(app);
server.listen(port);

var addr = server.address();
var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
console.log("Server running at " + bind);
