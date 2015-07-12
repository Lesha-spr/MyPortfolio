var mongoose = require('mongoose');
var async = require('async');
var rimraf = require('rimraf');
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

var dropMedia = function dropMedia(callback) {
    rimraf('./public/build/i', function() {
        callback();
    });
};

var createProjects = function createProjects(callback) {
    async.parallel([
        function(callback) {
            var project = new Project({
                title: 'Sportchek',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales erat velit, ac commodo libero luctus at. Cras posuere luctus lorem in tristique. Vivamus elementum sit amet urna non rutrum. In aliquet est sit amet purus congue aliquam. Maecenas facilisis ultrices metus eget mollis. Ut at porta enim. Proin tempus ex in tortor aliquam, sit amet auctor felis varius. Aenean rhoncus, turpis eget euismod lobortis, justo ligula sodales sem, a posuere elit est id lectus. Aenean in velit eget augue efficitur blandit. Ut non ultricies sem, ut varius nunc. Donec rhoncus justo sit amet nisi gravida, non dignissim quam iaculis. Morbi suscipit hendrerit varius.',
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
                title: 'Kyivstar',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales erat velit, ac commodo libero luctus at. Cras posuere luctus lorem in tristique. Vivamus elementum sit amet urna non rutrum. In aliquet est sit amet purus congue aliquam. Maecenas facilisis ultrices metus eget mollis. Ut at porta enim. Proin tempus ex in tortor aliquam, sit amet auctor felis varius. Aenean rhoncus, turpis eget euismod lobortis, justo ligula sodales sem, a posuere elit est id lectus. Aenean in velit eget augue efficitur blandit. Ut non ultricies sem, ut varius nunc. Donec rhoncus justo sit amet nisi gravida, non dignissim quam iaculis. Morbi suscipit hendrerit varius.',
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
                title: 'Shopart',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales erat velit, ac commodo libero luctus at. Cras posuere luctus lorem in tristique. Vivamus elementum sit amet urna non rutrum. In aliquet est sit amet purus congue aliquam. Maecenas facilisis ultrices metus eget mollis. Ut at porta enim. Proin tempus ex in tortor aliquam, sit amet auctor felis varius. Aenean rhoncus, turpis eget euismod lobortis, justo ligula sodales sem, a posuere elit est id lectus. Aenean in velit eget augue efficitur blandit. Ut non ultricies sem, ut varius nunc. Donec rhoncus justo sit amet nisi gravida, non dignissim quam iaculis. Morbi suscipit hendrerit varius.',
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
        },
        function(callback) {
            var technology = new Technology({
                title: 'jQuery'
            });

            technology.save(function(err, technology, affected) {
                technologies.push(technology._id);
                callback(err, technology);
            });
        },
        function(callback) {
            var technology = new Technology({
                title: 'React.js'
            });

            technology.save(function(err, technology, affected) {
                technologies.push(technology._id);
                callback(err, technology);
            });
        },
        function(callback) {
            var technology = new Technology({
                title: 'git'
            });

            technology.save(function(err, technology, affected) {
                technologies.push(technology._id);
                callback(err, technology);
            });
        },
        function(callback) {
            var technology = new Technology({
                title: 'Less'
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
        dropMedia,
        dropDatabase,
        createTechnologies,
        createProjects
    ], function(err, results) {
        console.log(results);
        mongoose.disconnect();
    }
);