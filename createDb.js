var mongoose = require('mongoose');
var async = require('async');
var Project = require('./models/Project').Project;
var Technology = require('./models/Technology').Technology;

var technologies = [];

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
                imgSrc: '/build/i/Sportchek.png',
                url: 'https://www.sportchek.ca/',
                name: 'sportchek',
                technologies: technologies
            });

            project.save(function(err, project, affected) {
                callback(err, project);
            });
        },
        function(callback) {
            var project = new Project({
                title: 'Second project',
                description: 'Lorem ipsum dolor sit amet',
                imgSrc: '/build/i/Kyivstar.png',
                url: 'http://kyivstar.ua',
                name: 'kyivstar',
                technologies: technologies
            });

            project.save(function(err, project, affected) {
                callback(err, project);
            });
        },
        function(callback) {
            var project = new Project({
                title: 'Third project',
                description: 'Lorem ipsum dolor sit amet',
                imgSrc: '/build/i/Shopart.png',
                url: 'https://shopart.ua',
                name: 'shopart'
            });

            project.save(function(err, project, affected) {
                callback(err, project);
            });
        }
    ], callback);
};

var createTechnologies = function createProjects(callback) {
    async.parallel([
        function(callback) {
            var technology = new Technology({
                title: 'CSS3'
            });

            technology.save(function(err, technology, affected) {
                technologies.push(technology._id);
                callback(err, technology);
            });
        },
        function(callback) {
            var technology = new Technology({
                title: 'HTML5'
            });

            technology.save(function(err, technology, affected) {
                technologies.push(technology._id);
                callback(err, technology);
            });
        }
    ], callback);
};

async.series([
        open,
        dropDatabase,
        createTechnologies,
        createProjects
    ], function(err, results) {
        console.log(results);
        mongoose.disconnect();
    }
);