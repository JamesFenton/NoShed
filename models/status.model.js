var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StatusSchema = new Schema({
    time: Date,
    loadshedding: Number
});

mongoose.model('StatusLog', StatusSchema);