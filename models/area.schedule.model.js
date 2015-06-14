var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var areaScheduleSchema = new Schema({
    day: Number,
	stage: Number,
    area: Number,
    startTime: Date,
    endTime: Date
});

mongoose.model('AreaSchedule', areaScheduleSchema);