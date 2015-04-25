var express = require('express');
var http = require('http');
var app = express();
app.use('/status', function(req, res) {
	
	console.log('Request from ' + req.hostname + ', ' + req.connection.remoteAddress);
	console.log(req.connection.remoteAddress);
	
	// Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
	
	res.setHeader('Content-Type', 'application/json');
	
	var options = {
	  host: 'loadshedding.eskom.co.za',
	  port: 80,
	  path: '/LoadShedding/GetStatus'
	};

	http.get(options, function(getRes) {
	  console.log("\tGot response from eskom.co.za: " + getRes.statusCode);
	  getRes.on('data', function (chunk) {
		console.log('\tBODY: ' + chunk);
		var status = parseInt(chunk) - 1;
		console.log('\tSending status: ' + status);
		res.send({'status': status});
	});
	  
	}).on('error', function(e) {
	  console.log("Got error: " + e.message);
	});
});

app.listen(3000);
console.log('Server running at http://localhost:3000/');
module.exports = app;