var mongoose = require('../config/mongoose');
mongoose();
var AreaInfo = require('mongoose').model('AreaInfo');

var readData = function(filePath){
	// read data from csv and return array of AreaInfo
}

var saveAreaData = function(data){
	// save the data
	for(var i = 0; i < data.length; i++){
		logEntry = data[i];
		console.log("saving: " + JSON.stringify(logEntry));
		logEntry.save(function (err, logEntry) {
			if (err) { 
				return console.error(err);
			}
		});
	}
}

var seedFromFiles = function(csvFileNames){
	for(var fileIndex = 0; fileIndex < csvFileNames.length; csvFileNames++) {
		var fileName = csvFileNames[fileIndex];
		// read file data
		var data = readData(fileName);
		// save the data
		saveAreaData(data);
	}
}

module.exports = {
	saveAreaData: saveAreaData,
	seedFromFile: seedFromFiles
};