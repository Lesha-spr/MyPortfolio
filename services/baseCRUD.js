var mongoose = require('mongoose');
var fs = require('fs');
var rimraf = require('rimraf');
var Imagemin = require('imagemin');
var path = require('path');
var async = require('async');
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
    },

    create: function create(req, callback) {
        var _this = this;
        var id = req.body._id || new mongoose.mongo.ObjectId();
        var asyncTasks = [];
        var reqData = _.extend({}, req.body);

        // TODO: extend to Files obj in case of multiple files
        // TODO: validate files
        // TODO: refactor
        delete reqData._id;

        if (req.files) {
            Object.keys(req.files).map(function(file) {
                asyncTasks.push(function(callback) {
                    fs.readFile(req.files[file].path, function(err, data) {
                        var newPath = path.join(__dirname, './../public/src/i/', req.files[file].originalname);

                        fs.writeFile(newPath, data, function(err) {
                            if (err) callback(err, data);

                            var mPath = path.join(__dirname, './../public');
                            reqData.imgSrc = '/build/i/' + req.files[file].originalname;

                            new Imagemin()
                                .src(mPath + '/src/i/*.{gif,jpg,png,svg}')
                                .dest(mPath + '/build/i')
                                .run(function (err, files) {
                                    rimraf('./public/tmp', function() {
                                        callback(err, data);
                                    });
                                });
                        });
                    })
                });
            });

            async.parallel(asyncTasks, function(err, result) {
                if (err) throw err;

                console.log(result);

                _this.Model.findOneAndUpdate({
                        _id: id
                    },
                    reqData,
                    {
                        new: true,
                        upsert: true
                    },
                    function(err, item) {
                        return callback(err, item);
                    }
                );
            });
        }
    }
});

module.exports = BaseService;