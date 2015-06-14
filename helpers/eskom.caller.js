var http = require('http');

var callEskom = function(callback){
	// call eskom.co.za
	var options = {
		host: 'loadshedding.eskom.co.za',
		port: 80,
		path: '/LoadShedding/GetStatus'
	};
	http.get(options, function(getRes) {
		// if a successful response from eskom.co.za
		if(getRes.statusCode === 200) {
			// send response
			getRes.on('data', function (chunk) {
				var status = parseInt(chunk) - 1;
				console.log("\tGot response from eskom.co.za: " + status);
				status = Math.max(0, status);
				callback(status);
			});
		}
		else{
			callback(-1);
		}
	}).on('error', function(e) {
		callback(-1);
	});
};

module.exports = callEskom;