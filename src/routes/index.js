var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let path = req.path;
  if(!(path.indexOf("/json") === 0 && path.indexOf("/json/") < 0)) {
     res.redirect('/mall/ticketSystem/index');
  }
  return;
});

router.get('/mall/*', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
