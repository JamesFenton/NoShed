var express = require('express');
var router = express.Router();

// route for /env
router.get('/', function (req, res) { 
	
	// headers
	res.setHeader('Access-Control-Allow-Origin', '*'); // Website you wish to allow to connect
	res.setHeader('Content-Type', 'application/json');
	
	res.send(process.env.NODE_ENV);
});

module.exports = router;