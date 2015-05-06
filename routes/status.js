var express = require('express');
var http = require('http');
var router = express.Router();
var log = require('../helpers/logging');

var timeOfLastUpdate = null;
var currentStatus = null;

// route for /status
router.get('/', function (req, res) { 
	
	// headers
	res.setHeader('Access-Control-Allow-Origin', '*'); // Website you wish to allow to connect
	//res.setHeader('Access-Control-Allow-Methods', 'GET'); // Request methods you wish to allow
	//res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // Request headers you wish to allow
	//res.setHeader('Access-Control-Allow-Credentials', true); // Set to true if you need the website to include cookies in the requests sent

	res.setHeader('Content-Type', 'application/json');

	var sendResponse = function(req, res, status) {
		console.log('\tSending status: ' + status);
		res.send({'status': status});
		// logging
		var clientAddress = req.header('x-forwarded-for') || req.connection.remoteAddress || 'unknown';
		log(clientAddress, 'debug', status, null);
	};

	var timeSinceLastUpdate = new Date() - timeOfLastUpdate;
	console.log("Last update was " + timeSinceLastUpdate/1000 + " seconds ago");

	// update status every 15 seconds
	var timeBetweenStatusUpdates = 15000; // milliseconds
	if(timeOfLastUpdate === null || currentStatus === null || timeSinceLastUpdate > timeBetweenStatusUpdates)
	{
		// call eskom.co.za
		var options = {
			host: 'loadshedding.eskom.co.za',
			port: 80,
			path: '/LoadShedding/GetStatus'
		};
		http.get(options, function(getRes) {
			timeOfLastUpdate = new Date();
			console.log("\tGot response from eskom.co.za: " + getRes.statusCode);
			// if a successful response from eskom.co.za
			if(getRes.statusCode === 200) {
				// send response
				getRes.on('data', function (chunk) {
						console.log('\tBODY: ' + chunk);
						var status = parseInt(chunk) - 1;
						currentStatus = status;
						sendResponse(req, res, status);
				});
			}
			else {
				var message = 'Could not connect to eskom.co.za: ' + getRes.statusCode;
				res.status(500).send({'error': message});
				var clientAddress = req.header('x-forwarded-for') || req.connection.remoteAddress || 'unknown';
				log(clientAddress, 'error', null, message);
			}
		// handle errors
		}).on('error', function(e) {
			var message = 'Could not connect to eskom.co.za: ' + e.code;
			res.status(500).send({'error': message});
			var clientAddress = req.header('x-forwarded-for') || req.connection.remoteAddress || 'unknown';
			log(clientAddress, 'error', null, message);
		});
	}
	else {
		sendResponse(req, res, currentStatus);
	}
});

module.exports = router;