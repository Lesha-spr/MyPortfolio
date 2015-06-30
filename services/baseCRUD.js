var mongoose = require('mongoose');
var _ = require('underscore');
var ErrorService = require('./../util/Errors');

var BaseService = function() {
    this.Model = null;
    this.name = null;
    this.mongoose = mongoose;
};

BaseService.prototype = _.extend({}, {
    /**
     * @param callback {Function}
     */
    getAll: function getAll(callback) {
        var _this = this;

        this.Model.find({}, function(err, collection) {
            if (!collection.length) {
                return callback(new ErrorService(424, {
                    error: _this.name + '.isEmptyCollection'
                }));
            }

            callback(err, collection);
        });
    },

    /**
     *
     * @param key {String}
     * @param value {String}
     * @param callback {Function}
     */
    getOne: function getOne(key, value, callback) {
        var _this = this;
        var criteria = {};

        criteria[key] = value;

        this.Model.findOne(criteria, function(err, item) {
            if (_.isEmpty(item)) {
                return callback(new ErrorService(424, {
                    error: _this.name + '.isEmpty'
                }));
            }

            callback(err, item);
        });
    }
});

module.exports = BaseService;