var mongoose = require('mongoose');

// Models
var Project = require('./../models/Project').Project;

function getAll(callback) {
    Project.find({}, function(err, projects, affected) {
        callback(err, projects);
    });
}

module.exports = {
    getAll: getAll
};