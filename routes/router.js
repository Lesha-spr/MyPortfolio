var express = require('express');
var router = express.Router();
var services = require('./services');

router.use('/services', services);

/* GET markup */
router.get('*', function(req, res, next) {
  res.render('index', { title: 'MyPortfolio' });
});

module.exports = router;
