var express = require('express');
var router = express.Router();
var ErrorService = require('./../util/Errors');
var _ = require('underscore');
var ProjectService = require('./../services/project');

// Service instance
var project = new ProjectService();

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

router.use(function(err, req, res, next) {
    if (err instanceof ErrorService) {
        return res.status(err.data.status).json(err.data);
    }

    next();
});

module.exports = router;