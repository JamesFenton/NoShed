var mongoose = require('../config/mongoose');
mongoose();

// Areas
var Area = require('mongoose').model('Area');

var readAreas = function(filePath){
	// read areas from file and return array of Area
};

var saveAreasFromFile = function(filePath) {
	var areaData = readAreas(filePath);
	// save data to db
	for(var i = 0; i < areaData.length; i++){
		var area = areaData[i];
		console.log("Saving: " + JSON.stringify(area));
		area.save(function (err, logEntry) {
			if (err) { 
				return console.error(err);
			}
		});
	}
};

// Area schedules
var AreaSchedule = require('mongoose').model('AreaSchedule');

var readAreaSchedule = function(filePath){
	// read data from csv and return array of AreaInfo
};

var saveAreaSchedule = function(data){
	// save data to db
	for(var i = 0; i < data.length; i++){
		var logEntry = data[i];
		console.log("Saving: " + JSON.stringify(logEntry));
		logEntry.save(function (err, logEntry) {
			if (err) { 
				return console.error(err);
			}
		});
	}
};

var saveAreaSchedulesFromFile = function(csvFileNames){
	for(var fileIndex = 0; fileIndex < csvFileNames.length; csvFileNames++) {
		var fileName = csvFileNames[fileIndex];
		// read file data
		var data = readAreaSchedule(fileName);
		// save the data
		saveAreaSchedule(data);
	}
};

module.exports = {
	saveAreas: saveAreasFromFile,
	saveAreaSchedulesFromFile: saveAreaSchedulesFromFile
};