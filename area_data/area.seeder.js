var fs = require('fs');

// Areas
var Area = require('mongoose').model('Area');

var readAreas = function(filePath){
	// read areas from file and return array of Area
	var data = fs.readFileSync(filePath, 'utf8');
	var areaData = JSON.parse(data);
	var areas = [];
	for (var i = 0; i < areaData.length; i++) {
		var element = areaData[i];
		areas.push(new Area({
			municipality: element.Municipality,
			areas: element.Areas
		}));
	}
	console.log(JSON.stringify(areas));
	return areas;
};

var saveAreasFromFile = function(filePath) {
	var areaData = readAreas(filePath);
	// save data to db
	for(var i = 0; i < areaData.length; i++){
		var area = areaData[i];
		console.log("Saving: " + JSON.stringify(area));
		area.save();
	}
};

// Area schedules
var AreaSchedule = require('mongoose').model('AreaSchedule');

var timeToDate = function(timeString){
	var split = timeString.split(":");
	var date = new Date(2000, 1, 1);
	date.setHours(parseInt(split[0]));
	date.setMinutes(parseInt(split[1]));
	return date;
};

var readAreaSchedule = function(filePath){
	// read data from csv and return array of AreaInfo
	var areaSchedule = [];
	var data = fs.readFileSync(filePath, 'utf8');
	var lines = data.split("\n");
	var topLine = lines[0].split(",");
	for (var row = 1; row < lines.length; row++) {
		var line = lines[row];
		var colsInThisLine = line.split(",");
		for (var col = 2; col < colsInThisLine.length; col++) {
			var day = parseInt(topLine[col]);
			var stage = parseInt(topLine[1]);
			var area = colsInThisLine[col];
			var startTime = timeToDate(colsInThisLine[0]);
			var endTime = timeToDate(colsInThisLine[1]);
			
			var entry = new AreaSchedule({
				day: day,
				stage: stage,
			    area: area,
			    startTime: startTime,
			    endTime: endTime
			});
			areaSchedule.push(entry);
		}
	}
	return areaSchedule;
};

var saveAreaSchedule = function(data){
	// save data to db
	for(var i = 0; i < data.length; i++){
		var entry = data[i];
	 	entry.save();
	}
};

var saveAreaSchedulesFromFile = function(csvFileNames){
	
		console.log("files: " + csvFileNames);
	for(var fileIndex = 0; fileIndex < csvFileNames.length; fileIndex++) {
		var fileName = csvFileNames[fileIndex];
		console.log("file: " + fileName);
		// read file data
		var data = readAreaSchedule(fileName);
		// save the data
		saveAreaSchedule(data);
	}
};

module.exports = {
	saveAreasFromFile: saveAreasFromFile,
	saveAreaSchedulesFromFile: saveAreaSchedulesFromFile
};