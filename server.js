process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
console.log("Running in env " + process.env.NODE_ENV);

// setup express
var express = require('express');
var app = express();
// setup DB
var mongoose = require('./config/mongoose');
var db = mongoose();

// serve static pages in ./www
app.use('/', express.static(__dirname + '/www'));

// routes
var status = require('./routes/status');
app.use('/status', status);

// log status
var logger = require('./helpers/logging');
var eskomCaller = require('./helpers/eskom.caller');

var CronJob = require('cron').CronJob;
new CronJob('00 */10 * * * *', function(){
	console.log("logging scheduled status");
	eskomCaller(logger.logStatus);
}).start();

module.exports = app;