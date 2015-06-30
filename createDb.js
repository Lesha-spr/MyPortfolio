var mongoose = require('mongoose');
var async = require('async');
var Project = require('./models/Project').Project;

var open = function open(callback) {
    mongoose.connection.on('open', callback);
};

var dropDatabase = function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
};

var createProjects = function createProjects(callback) {
    async.parallel([
        function(callback) {
            var project = new Project({
                title: 'First project',
                description: 'Lorem ipsum dolor sit amet',
                imgSrc: '/src/i/Sportchek.png',
                url: 'https://www.sportchek.ca/',
                name: 'sportchek'
            });

            project.save(function(err, project, affected) {
                callback(err, project);
            });
        },
        function(callback) {
            var project = new Project({
                title: 'Second project',
                description: 'Lorem ipsum dolor sit amet',
                imgSrc: '/src/i/Kyivstar.png',
                url: 'http://kyivstar.ua',
                name: 'kyivstar'
            });

            project.save(function(err, project, affected) {
                callback(err, project);
            });
        }
    ], callback);
};

async.series([
        open,
        dropDatabase,
        createProjects
    ], function(err, results) {
        console.log(results);
        mongoose.disconnect();
    }
);