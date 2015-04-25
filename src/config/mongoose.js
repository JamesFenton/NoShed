var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    console.log("Connection to db at " + config.db);
    var db = mongoose.connect(config.db);
    
    require('../app/models/log.model.js');
    
    return db;
};