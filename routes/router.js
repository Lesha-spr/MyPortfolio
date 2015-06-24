var express = require('express');
var router = express.Router();
var services = require('./services');

router.use('/services', services);

/* GET home page. */
router.get('*', function(req, res, next) {
  res.render('index', { title: 'MyPortfolio' });
});

module.exports = router;
