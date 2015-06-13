var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AreaScheduleSchema = new Schema({
    day: Number,
	stage: Number,
    area: Number,
    startTime: Date,
    endTime: Date
});

mongoose.model('AreaSchedule', AreaScheduleSchema);