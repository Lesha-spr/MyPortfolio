var util = require('util');
var async = require('async');
var _ = require('underscore');
var BaseService = require('./baseCRUD');
var TechnologyService = require('./technology');
var ErrorService = require('./../util/Errors');

// Model
var Project = require('./../models/Project').Project;

// Services
var technology = new TechnologyService();

var ProjectService = function() {
    BaseService.apply(this, arguments);
    this.Model = Project;
    this.name = 'project';
};

util.inherits(ProjectService, BaseService);

/**
 * @param callback {Function}
 */
ProjectService.prototype.getAll = function getAll(callback) {
    var _this = this;
    var asyncTasks = [];

    this.Model.find({}, function(err, collection) {
        if (!collection.length) {
            return callback(new ErrorService(424, {
                error: _this.name + '.isEmptyCollection'
            }));
        }

        collection.map(function(item) {
            asyncTasks.push(function(callback) {
                _this.join(item, technology, 'technologies', callback);
            });
        });

        async.parallel(asyncTasks, function(err) {
            callback(err, collection);
        });
    });
};

/**
 *
 * @param key {String}
 * @param value {String}
 * @param callback {Function}
 */
ProjectService.prototype.getOne = function getOne(key, value, callback) {
    var _this = this;
    var criteria = {};

    criteria[key] = value;

    this.Model.findOne(criteria, function(err, item) {
        if (_.isEmpty(item)) {
            return callback(new ErrorService(424, {
                error: _this.name + '.isEmpty'
            }));
        }

        _this.join(item, technology, 'technologies', callback);
    });
};

module.exports = ProjectService;