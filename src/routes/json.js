var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var FuncNoConfig = require('./config');

//设置跨域访问
router.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

/* POST json listing. */
router.get("*", (req, res, next) => {
    var params = req.query;
    var callbackFun = (data) => {
        res.status(data.status).json(data);
    };
    FuncNoConfig[params.funcNo](params, callbackFun);
})

router.post("*", (req, res, next) => {
  var params = req.body;
  var callbackFun = (data) => {
      res.status(data.status).json(data);
  };
  console.log(FuncNoConfig[params.funcNo], 66666333)
  FuncNoConfig[params.funcNo](params, callbackFun);
})

module.exports = router;
