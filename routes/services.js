var express = require('express');
var router = express.Router();
var ErrorService = require('./../util/Errors');
var _ = require('underscore');
var ProjectService = require('./../services/project');
var TechnologyService = require('./../services/technology');

// Service instance
var project = new ProjectService();
var technology = new TechnologyService();

router.get('/projects', function(req, res, next) {
    project.getAll(function(err, projects) {
        if (err) return next(err);

        res.json(projects);
    });
});

router.get('/projects/:name', function(req, res, next) {
    if (req.params.name) {
        project.getOne('name', req.params.name, function(err, project) {
            if (err) return next(err);

            res.json(project);
        });
    } else {
        next();
    }
});

router.post('/projects/create', function(req, res, next) {
    if (req.body) {
        project.create(req, function() {
            // TODO: prepare response
            res.json(req.body);
        });
    } else {
        next();
    }
});

router.get('/technologies', function(req, res, next) {
    technology.getAll(function(err, technologies) {
        if (err) return next(err);

        res.json(technologies);
    });
});

router.use(function(err, req, res, next) {
    if (err instanceof ErrorService) {
        return res.status(err.data.status).json(err.data);
    }

    next();
});

module.exports = router;