var mongoose = require('mongoose');

// Models
var Project = require('./../models/Project').Project;

function getAll(callback) {
    Project.find({}, function(err, projects) {
        callback(err, projects);
    });
}

function getOne(id, callback) {
    Project.findOne({_id: id}, function(err, project) {
        callback(err, project);
    });
}

module.exports = {
    getAll: getAll,
    getOne: getOne
};