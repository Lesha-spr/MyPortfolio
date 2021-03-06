var express = require('express');
var router = express.Router();
var async = require('async');
var ErrorService = require('./../util/Errors');
var mongoose = require('mongoose');
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
    res.render('admin/index');
});

router.get('/projects', function(req, res, next) {
    project.getAll(function(err, projects) {
        if (err) next(err);

        res.render('admin/projects', {
            projects: projects
        });
    }, req.xhr);
});

router.get('/projects/:id', function(req, res, next) {
    if (req.params.id === 'new') {
        res.render('admin/project');
    } else {
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

            var flatTechs = technologies.map(function(technology) {
                return technology.toObject();
            });

            flatTechs.forEach(function(technology) {
                project.technologies.forEach(function(projectTech) {
                    if (technology._id.equals(projectTech._id)) {
                        technology.isActive = true;
                    }
                });
            });

            res.render('admin/project', {
                project: project,
                technologies: flatTechs
            });
        });
    }
});

router.get('/technologies', function(req, res, next) {
    technology.getAll(function(err, technologies) {
        if (err) return next(err);

        res.render('admin/technologies', {
            technologies: technologies
        });
    });
});

router.get('/technologies/:id', function(req, res, next) {
    if (req.params.id === 'new') {
        res.render('admin/technology');
    } else {
        technology.getOne('_id', req.params.id, function(err, technology) {
            if (err) return next(err);

            res.render('admin/technology', {
                technology: technology
            });
        });
    }
});

module.exports = router;