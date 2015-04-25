var express = require('express');
var http = require('http');
var app = express();
app.use('/status', function(req, res) {
	
	console.log(req.method + ' request from ' + req.hostname + ' at IP ' + req.connection.remoteAddress);
	
	if(req.method === "GET") {
		// headers
		res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100'); // Website you wish to allow to connect
		res.setHeader('Access-Control-Allow-Methods', 'GET'); // Request methods you wish to allow
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // Request headers you wish to allow
		res.setHeader('Access-Control-Allow-Credentials', true); // Set to true if you need the website to include cookies in the requests sent
		
		res.setHeader('Content-Type', 'application/json');
		
		// call eskom.co.za
		var options = {
		  host: 'loadshedding.eskom.co.za',
		  port: 80,
		  path: '/LoadShedding/GetStatus'
		};
		
		http.get(options, function(getRes) {
		    console.log("\tGot response from eskom.co.za: " + getRes.statusCode);
		    // send response
		    getRes.on('data', function (chunk) {
				console.log('\tBODY: ' + chunk);
				var status = parseInt(chunk) - 1;
				console.log('\tSending status: ' + status);
				res.send({'status': status});
			});
		// handle errors
		}).on('error', function(e) {
			res.status(500).send({'error': e.message});
		    console.log("Got error: " + e.message);
		});
	}
	else {
		res.status(404).send();
	}
});

app.listen(3000);
console.log('Server running at http://localhost:3000/');
module.exports = app;