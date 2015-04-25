var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StatusLogSchema = new Schema({
    time: Date,
    user: String,
    level: String,
    loadshedding: String,
    message: String
});

mongoose.model('StatusLog', StatusLogSchema);