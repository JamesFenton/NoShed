var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RequestLogSchema = new Schema({
    time: Date,
    user: String,
    level: String,
    loadshedding: String,
    message: String
});

mongoose.model('RequestLog', RequestLogSchema);