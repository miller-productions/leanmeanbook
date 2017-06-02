'use strict';

var express = require('express');
var config = require('../config');
var chalk = require('chalk');
var mongoose = require('./mongoose');

module.exports.init = function init(callback) {
  // Establish the database connection
  mongoose.connect(function(db) {
    // Initialise express
    var app = express();
    app.get('/', function(req, res) {
      res.send('Hello World!');
    });
    if (callback) {
      callback(app);
    }
  });
};

module.exports.start = function start() {
  var _this = this;

  _this.init(function(app) {
    var server = app.listen(config.port, function() {
      console.log('--');
      console.log(chalk.green(config.app.title));
      console.log();
      console.log('Listening on port %s', config.port);
      console.log();
      console.log(chalk.green('Environment:     ' + process.env.NODE_ENV));
      console.log(chalk.green('Database:        ' + config.db.uri));
      console.log(chalk.green('App version:     ' + config.packageJson.version));
      console.log('--');
    });
  });
};

