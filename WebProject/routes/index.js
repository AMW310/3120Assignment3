var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET list page. */
//router.get('/list', function(req, res, next) {
  //res.render('list', { title: 'List' });
//});

module.exports = router;
