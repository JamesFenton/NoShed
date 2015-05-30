var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    require('../models/request.model.js');
	require('../models/status.model.js');
    
    console.log("Connecting to db at " + config.db);
    var db = mongoose.connect(config.db);
    
    var connection = mongoose.connection;
    connection.on('error', console.error.bind(console, 'Error connecting to DB'));
    connection.once('open', function (callback) {
        console.log('Successfully connected to DB');
    });
    
    return db;
};