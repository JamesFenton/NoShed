var mongoose = require('../config/mongoose');

var RequestLog = require('mongoose').model('RequestLog');
var StatusLog = require('mongoose').model('StatusLog');

// logs a request to the website
var logRequest = function(user, level, loadshedding, message){
    var logEntry = new RequestLog({
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

// logs a loadshedding status
var logStatus = function(status){
	var logEntry = new StatusLog({
		time: new Date(),
    	loadshedding: status
	});
	console.log("Logging status: " + JSON.stringify(logEntry));
};

module.exports = { 
	logRequest: logRequest, 
	logStatus: logStatus
};