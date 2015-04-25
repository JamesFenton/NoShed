process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

var express = require('express');
var http = require('http');
var app = express();
var mongoose = require('./config/mongoose');
var db = mongoose();

var StatusLog = require('mongoose').model('StatusLog');

app.use('/status', function (req, res) {
	
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
            if(getRes.statusCode === 200){
                // send response
                getRes.on('data', function (chunk) {
                    console.log('\tBODY: ' + chunk);
                    var status = parseInt(chunk) - 1;
                    console.log('\tSending status: ' + status);
                    res.send({'status': status});
                    log(req.connection.remoteAddress, 'debug', status, null);
                });
            }
            else {
                res.status(500).send({'error': 'Could not connect to eskom.co.za: ' + getRes.statusMessage});
                log(req.connection.remoteAddress, 'error', null, 'Could not connect to eskom.co.za: ' +getRes.statusMessage);
            }
			
		// handle errors
		}).on('error', function(e) {
			res.status(500).send({'error': 'Could not connect to eskom.co.za: ' + e.statusMessage});
            log(req.connection.remoteAddress, 'error', null, 'Could not connect to eskom.co.za: ' +e.statusMessage);
		});
	}
	else {
		res.status(404).send();
	}
});

var log = function(user, level, loadshedding, message){
    var logEntry = new StatusLog({
            time: new Date(),
            user: user,
            level: level,
            loadshedding: loadshedding,
            message: message
    });
        
    logEntry.save(function (err, logEntry) {
        if (err) { 
            return console.error(err);
        }
        else {
        }
    });
};

app.listen(3000);
console.log('Server running at http://localhost:3000/');
module.exports = app;