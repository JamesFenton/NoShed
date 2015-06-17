process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
var mongoose = require('../config/mongoose');
mongoose();

var seeder = require('./area.seeder');

seeder.saveAreasFromFile('areas.json');
seeder.saveAreaSchedulesFromFile(['stage1.csv', 'stage2.csv', 'stage3a.csv', 'stage3b.csv']);