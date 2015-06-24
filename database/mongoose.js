var config = require('./../config/config.json');
var mongoose = require('mongoose');

mongoose.connect(config.mongoose.uri, config.mongoose.options);

module.exports = mongoose;