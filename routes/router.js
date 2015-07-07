var express = require('express');
var router = express.Router();
var services = require('./services');
var admin = require('./admin');

router.use('/services', services);

router.use('/admin', admin);

/* GET markup */
router.get('*', function(req, res, next) {
  res.render('index', { title: 'MyPortfolio' });
});

module.exports = router;
