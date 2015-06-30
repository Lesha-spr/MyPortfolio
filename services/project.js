var util = require('util');
var BaseService = require('./baseCRUD');

// Model
var Project = require('./../models/Project').Project;

var ProjectService = function() {
    BaseService.apply(this, arguments);
    this.Model = Project;
    this.name = 'project';
};

util.inherits(ProjectService, BaseService);

module.exports = ProjectService;