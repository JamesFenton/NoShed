var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AreaSchema = new Schema({
    municipality: String,
	areas: [Number]
});

mongoose.model('Area', AreaSchema);