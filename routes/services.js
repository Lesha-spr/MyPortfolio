var express = require('express');
var router = express.Router();
var project = require('./../services/project');

router.get('/projects', function(req, res, next) {
    project.getAll(function(err, projects) {
        res.json({projects: projects});
    });
});

module.exports = router;