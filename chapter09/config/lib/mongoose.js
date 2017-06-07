'use strict';

// Module dependencies
var mongoose = require('mongoose');
var chalk = require('chalk');
var config = require('../config');

// Establish database connection
module.exports.connect = function(cb) {
  var _this = this;

  var db = mongoose.connect(config.db.uri, config.db.options, function(err) {
    // Log Error
    if (err) {
      console.error(chalk.red('Could not connect to MongoDB!'));
      console.log(err);
    } else {
      // Enable mongoose debug mode if required
      mongoose.set('debug', config.db.debug);
      // Activate the callback
      if (cb) {
        cb(db);
      }
    }
  });
};

// Disconnect from database
module.exports.disconnect = function (cb) {
  mongoose.disconnect(function (err) {
    console.info(chalk.yellow('Disconnected from MongoDB.'));
    cb(err);
  });
};
