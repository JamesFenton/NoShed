var mongoose = require('../config/mongoose');

var StatusLog = require('mongoose').model('StatusLog');

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

module.exports = log;