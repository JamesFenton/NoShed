var mongoose = require('../config/mongoose');

var RequestLog = require('mongoose').model('RequestLog');

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
    });
};

module.exports = { 
	logRequest: logRequest
};