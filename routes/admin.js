var express = require('express');
var router = express.Router();
var async = require('async');
var ErrorService = require('./../util/Errors');
var _ = require('underscore');

var ProjectsService = require('./../services/project');
var TechnologyService = require('./../services/technology');

var project = new ProjectsService();
var technology = new TechnologyService();

router.use(function(req, res, next) {
    var isAdmin = req.cookies.isAdmin;

    if (isAdmin) {
        next();
    } else {
        res.render('admin/login');
    }
});

router.get('/', function(req, res, next) {
    project.getAll(function(err, projects) {
        if (err) next(err);

        res.render('admin/index', {
            projects: projects
        });
    });
});

router.get('/projects/:id', function(req, res, next) {
    async.parallel([
        function(callback) {
            project.getOne('_id', req.params.id, function(err, project) {
                callback(err, project);
            });
        },
        function(callback) {
            technology.getAll(function(err, technologies) {
                callback(err, technologies);
            });
        }
    ], function(err, result) {
        if (err) return next(err);

        var project = result[0];
        var technologies = result[1];

        // TODO: mark active technologies

        res.render('admin/project', {
            project: project,
            technologies: technologies
        });
    });
});

router.get('/technologies', function(req, res, next) {
    technology.getAll(function(err, technologies) {
        if (err) return next(err);

        res.render('admin/index', {
            technologies: technologies
        });
    });
});

module.exports = router;