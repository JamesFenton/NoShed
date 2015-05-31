var logger = require('./logging');
var eskomCaller = require('./eskom.caller');

// frequency string of the form '* * * * * *'
// call .start() to start the CronJob
module.exports = function(frequencyString){
	var CronJob = require('cron').CronJob;
	return new CronJob(frequencyString, function(){
		console.log("logging scheduled status");
		eskomCaller(logger.logStatus);
	});
}