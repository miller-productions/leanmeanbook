'use strict';

// Module dependencies
var _ = require('lodash');
var config = require('../config');
var chalk = require('chalk');
var fs = require('fs');
var winston = require('winston');

// List of valid formats for log entries
var validFormats = ['combined', 'common', 'dev', 'short', 'tiny'];

// Instantiate default winston logger with the Console transport
var logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      colorize: true,
      showLevel: true,
      handleExceptions: true,
      humanReadableUnhandledException: true,
    }),
  ],
  exitOnError: false,
});

// A stream object with a write function that will call
// the built-in winston logger.info() function.
// Useful for integrating with stream-related mechanisms
// like Morgan's stream option to log all HTTP requests to a file
logger.stream = {
  write: function(msg) {
    logger.info(msg);
  },
};

// Instantiate a winston File transport for disk file logging
logger.setupFileLogger = function setupFileLogger() {
  var fileTransportOptions = this.getFileTransportOptions();
  if (!fileTransportOptions) {
    return false;
  }

  try {
    // Check first if the configured path is writable and only then
    // instantiate the file logging transport
    if (fs.openSync(fileTransportOptions.filename, 'a+')) {
      logger.add(winston.transports.File, fileTransportOptions);
    }
    return true;
  } catch (err) {
    if (process.env.NODE_ENV !== 'test') {
      console.log();
      console.log(chalk.red('An error has occured' +
        'during the creation of the File transport logger.'));
      console.log(chalk.red(err));
      console.log();
    }
    return false;
  }
};

// The options to use with a Winston File transport for our logger
logger.getFileTransportOptions =
function getFileTransportOptions(configOptions) {

  var _config = _.clone(config, true);
  if (configOptions) {
    _config = configOptions;
  }
  var configFileLogger = _config.log.fileLogger;
  if (!_.has(_config, 'log.fileLogger.directoryPath') ||
  !_.has(_config, 'log.fileLogger.fileName')) {
    console.log('unable to find logging file configuration');
    return false;
  }
  var logPath = configFileLogger.directoryPath +
  '/' + configFileLogger.fileName;

  return {
    level: 'debug',
    colorize: false,
    filename: logPath,
    timestamp: true,
    maxsize: configFileLogger.maxsize ? configFileLogger.maxsize : 10485760,    
    maxFiles: configFileLogger.maxFiles ? configFileLogger.maxFiles : 2,
    json: (_.has(configFileLogger, 'json')) ? configFileLogger.json : false,
    eol: '\n',
    tailable: true,
    showLevel: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
  };
};

// The options to use with morgan logger
// Returns a log.options object with a writable stream
// based on winston file logging transport (if available)
logger.getMorganOptions = function getMorganOptions() {
  return {
    stream: logger.stream,
  };
};

// Get the format to use with the logger
// Returns log.format option set in the current environment configuration
logger.getLogFormat = function getLogFormat() {
  var format = config.log && config.log.format ?
  config.log.format.toString() : 'combined';

  // Make sure we have a valid format
  if (!_.includes(validFormats, format)) {
    format = 'combined';

    if (process.env.NODE_ENV !== 'test') {
      console.log();
      console.log(chalk.yellow('Warning: An invalid format was provided.' +
      'The logger will use the default format of "' + format + '"'));
      console.log();
    }
  }

  return format;
};

logger.setupFileLogger();

module.exports = logger;
