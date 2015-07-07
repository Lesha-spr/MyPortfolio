var express = require('express');
var router = express.Router();
var ErrorService = require('./../util/Errors');
var _ = require('underscore');

var TechnologyService = require('./../services/technology');

var technology = new TechnologyService();

router.get('/', function(req, res, next) {
    technology.getAll(function(err, technologies) {
        if (err) return next(err);

        res.render('admin/index', {
            technologies: technologies
        });
    });
});

module.exports = router;