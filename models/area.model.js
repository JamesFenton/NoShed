var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AreaInfoSchema = new Schema({
    day: Number,
	stage: Number,
    area: Number,
    startTime: Date,
    endTime: Date
});

mongoose.model('AreaInfo', AreaInfoSchema);