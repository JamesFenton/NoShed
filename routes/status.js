var express = require('express');
var http = require('http');
var router = express.Router();
var log = require('../helpers/logging');
var eskomCaller = require('../helpers/eskom.caller');

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

	// the function for sending a response and logging
	var sendResponse = function(req, res, loadsheddingStatus, message) {
		console.log('\tSending load shedding status: ' + loadsheddingStatus);
		responseCode = loadsheddingStatus >= 0 ? 200 : 500;
		res.status(responseCode).send({'status': loadsheddingStatus, 'message': message});
		// logging
		var clientAddress = req.header('x-forwarded-for') || req.connection.remoteAddress || 'unknown';
		log.logRequest(clientAddress, 'debug', loadsheddingStatus, message);
	};

	// define the callback when the loadshedding status is fetched
	var gotStatusCallback = function(loadsheddingStatus){
		// if successful
		if(loadsheddingStatus >= 0){
			sendResponse(req, res, loadsheddingStatus);
		}
		// if failure
		else {
			var message = 'Could not connect to eskom.co.za';
			sendResponse(req, res, -1, message);
		}
	}
	
	// get the load shedding status
	var loadsheddingStatus = eskomCaller(gotStatusCallback);
	
});

module.exports = router;