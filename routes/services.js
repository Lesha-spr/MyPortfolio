var express = require('express');
var router = express.Router();
var project = require('./../services/project');
var ErrorService = require('./../util/Errors');
var _ = require('underscore');

router.get('/projects', function(req, res, next) {
    project.getAll(function(err, projects) {
        if (err) return next(err);
        if (!projects.length) return next(424);

        res.json({projects: projects});
    });
});

router.get('/projects/:id', function(req, res, next) {
    if (req.params.id) {
        project.getOne(req.params.id, function(err, project) {
            if (err) return next(err);
            if (!project || _.isEmpty(project)) return next(424);

            res.json(project);
        });
    } else {
        next();
    }
});

router.use(function(err, req, res, next) {
    if (typeof err === 'number') {
        err = new ErrorService(err, {
            error: 'error.test.key'
        });
    }

    if (err instanceof ErrorService) {
        res.status(err.data.status).json(err.data);
    }

    next();
});

module.exports = router;