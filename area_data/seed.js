process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

var seeder = require('./area.seeder');

// data is a test. Remove it
var mongoose = require('../config/mongoose');
mongoose();
var AreaInfo = require('mongoose').model('AreaInfo');

var data = [
	new AreaInfo({
		day: 1,
		stage: 1,
		area: 1,
		startTime: new Date(2015, 6, 8, 18, 00, 00),
		endTime: new Date(2015, 6, 8, 20, 00, 00)
	}), 
	new AreaInfo({
		day: 1,
		stage: 1,
		area: 2,
		startTime: new Date(2015, 6, 8, 20, 00, 00),
		endTime: new Date(2015, 6, 8, 22, 00, 00)
	})
];

seeder.saveAreaData(data);