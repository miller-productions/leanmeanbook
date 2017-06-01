'use strict';

var express = require('express');

module.exports.init = function init(callback) {
  // Initialise express
  var app = express();
  app.get('/', function(req, res) {
    res.send('Hello World!');
  });
  if (callback) {
    callback(app);
  }
};

module.exports.start = function start() {
  var _this = this;

  _this.init(function(app) {
    var server = app.listen(3000, function() {
      var port = server.address().port;
      console.log('Example app listening on port %s', port);
    });
  });
};
