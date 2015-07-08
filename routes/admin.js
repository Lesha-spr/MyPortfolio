var express = require('express');
var router = express.Router();
var ErrorService = require('./../util/Errors');
var _ = require('underscore');

var TechnologyService = require('./../services/technology');

var technology = new TechnologyService();

router.use(function(req, res, next) {
    var isAdmin = req.cookies.isAdmin;
    console.log(req.cookies);

    if (isAdmin) {
        next();
    } else {
        res.render('admin/login');
    }
});

router.get('/', function(req, res, next) {
    technology.getAll(function(err, technologies) {
        if (err) return next(err);

        res.render('admin/index', {
            technologies: technologies
        });
    });
});

module.exports = router;