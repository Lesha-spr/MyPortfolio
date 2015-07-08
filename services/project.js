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
    var parallel = [];

    this.Model.find({}, function(err, collection) {
        if (!collection.length) {
            return callback(new ErrorService(424, {
                error: _this.name + '.isEmptyCollection'
            }));
        }

        collection.map(function(item) {
            parallel.push(function(callback) {
                _this.getTechs(item, callback);
            });
        });

        async.parallel(parallel, function(err) {
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

        _this.getTechs(item, callback);
    });
};

// TODO: describe method fully
/**
 *
 * @param item {Object} db record
 * @param callback {Function}
 */
ProjectService.prototype.getTechs = function(item, callback) {
    var asyncTasks = [];

    item.technologies.forEach(function(id, index) {
        asyncTasks.push(function(callback) {
            technology.getOne('_id', id, function(err, technology) {
                if (technology) {
                    item.technologies[index] = technology;
                }

                callback(err, technology);
            });
        });
    });

    async.parallel(asyncTasks, function(err) {
        callback(err, item);
    });
};

module.exports = ProjectService;