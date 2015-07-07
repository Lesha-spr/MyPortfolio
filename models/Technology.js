var mongoose = require('./../database/mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    title: {
        type: String,
        required: true
    }
});

schema.methods = {};

exports.Technology = mongoose.model('Technology', schema);