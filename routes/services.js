var express = require('express');
var router = express.Router();
var project = require('./../services/project');
var ErrorService = require('./../util/Errors');

router.get('/projects', function(req, res, next) {
    project.getAll(function(err, projects) {
        if (err) return next(err);
        if (!projects.length) return next(424);

        res.json({projects: projects});
    });
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
});

module.exports = router;