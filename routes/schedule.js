var express = require('express');
var router = express.Router();
var AreaSchedule = require('mongoose').model('AreaSchedule');

// route for /schedule
router.get('/:day/:stage/:area', function (req, res) { 
	
	var day = parseInt(req.params.day);
	var stage = parseInt(req.params.stage);
	var area = parseInt(req.params.area);
	
	// headers
	res.setHeader('Access-Control-Allow-Origin', '*'); // Website you wish to allow to connect
	res.setHeader('Content-Type', 'application/json');
	
	var query = {"day": day, "stage": stage, "area": area};
	console.log("finding: " + JSON.stringify(query));
	
	AreaSchedule.find({})
				.where("day").equals(day)
				.where("stage").equals(stage)
				.where("area").equals(area)
				.sort("startTime")
				.exec(function (err, schedule) {
		if (err) 
			return console.error(err);
		
		var response = [];
		for (var index = 0; index < schedule.length; index++) {
			var element = schedule[index];
			response.push({
				"startTime": element.startTime,
				"endTime": element.endTime
			});
		}
		
		res.send(response);
	});
});

module.exports = router;