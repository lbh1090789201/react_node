var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require("ejs");
var webpack = require("webpack");

var index = require('./routes/index');
var json = require('./routes/json');

var app = express();
//用ejs模版引擎时，使其支持.html后缀
app.engine('.html', ejs.__express);　//让ejs能够识别后缀为'.html'的文件
app.set('view engine', 'html'); // 使在调用render函数时能自动为我们加上'.html'后缀
app.set('views', path.join(__dirname, '/dist/views')); // 设置访问views的路径

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


if(process.env.NODE_ENV == "production") {
	app.use(express.static(path.join(__dirname, 'dist'),{maxAge:1000*60*60*30}));
  app.use(express.static(path.join(__dirname, '../src'),{maxAge:1000*60*60*30}));
  app.use(express.static(path.join(__dirname, 'tmp'),{maxAge:1000*60*60*30}));
}else{
  let devMiddleWare = require('webpack-dev-middleware');
  let hotMiddleWare = require('webpack-hot-middleware');
  let webpackconfig = require('../webpack.config.js');

  var compiler = webpack(webpackconfig);
  app.use(devMiddleWare(compiler,{
      publicPath: webpackconfig.output.publicPath,
      noInfo: true,
      lazy: false,
      stats: {
        colors: true,
        chunks: false
      }
  }));

  app.use(hotMiddleWare(compiler));
}

app.use('/', index);
app.use('/mall', index); // 设页面访问路由
app.use('/json', json); // 设置接口访问路由

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
