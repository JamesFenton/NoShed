var express = require('express');
var router = express.Router();
path = require('path');

var mongoose = require('../config/mongoose');
var StatusLog = require('mongoose').model('StatusLog');

// route for /history
router.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../www/history.html'));
});

// route for /history/data
router.get('/data', function(req, res){
	StatusLog.find({}) 
			 .sort('-time')
		     .limit(100)
			 .exec(function(err, logs){
		if (err) {
			res.send("Error")
		} else {
			var result = logs;
			res.send(result);
		}
	});
});

module.exports = router;