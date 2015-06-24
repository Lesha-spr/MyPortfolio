var mongoose = require('./../db/mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imgSrc: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.methods = {};

exports.Project = mongoose.model('Project', schema);