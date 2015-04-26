var express = require('express');
var http = require('http');
var router = express.Router();

// route for /status
router.get('/', function (req, res) { 
    res.status(200).send("Welcome to NoShed");
});
           
module.exports = router;