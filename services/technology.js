var util = require('util');
var BaseService = require('./baseCRUD');

// Model
var Technology = require('./../models/Technology').Technology;

var TechnologyService = function() {
    BaseService.apply(this, arguments);
    this.Model = Technology;
    this.name = 'technology';
};

util.inherits(TechnologyService, BaseService);

module.exports = TechnologyService;