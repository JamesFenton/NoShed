var express = require('express');
var router = express.Router();
var Area = require('mongoose').model('Area');

// route for /areas
router.get('/:municipality', function (req, res) { 
	
	var municipality = req.params.municipality;
	
	// headers
	res.setHeader('Access-Control-Allow-Origin', '*'); // Website you wish to allow to connect
	res.setHeader('Content-Type', 'application/json');
	
	Area.findOne({"municipality": municipality}, function (err, area) {
		if (err) 
			return console.error(err);
		if (area === null)
			res.status(500).send();
		else
			res.send(area.areas);
	});
});

module.exports = router;