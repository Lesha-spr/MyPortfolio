var express = require('express');
var router = express.Router();
var ErrorService = require('./../util/Errors');
var _ = require('underscore');
var LoginService = require('./../services/login');
var ProjectService = require('./../services/project');
var TechnologyService = require('./../services/technology');

// Service instance
var project = new ProjectService();
var technology = new TechnologyService();
var login = new LoginService();

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

// TODO: make it OK!
router.post('/login', function(req, res, next) {
    if (login.validate(req.body.password)) {
        res.cookie('isAdmin', true, { maxAge: 1000 * 60 * 60, httpOnly: true });
    }

    res.redirect('/admin');
});

module.exports = router;