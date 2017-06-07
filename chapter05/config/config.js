'use strict';

var _ = require('lodash');
var glob = require('glob');
var path = require('path');
var chalk = require('chalk');

// Validate the existence of NODE_ENV
var validateEnvironmentVariable = function() {
  var environmentFiles = glob.sync('./config/env/' +
    process.env.NODE_ENV + '.js');
  console.log();
  if (!environmentFiles.length) {
    if (process.env.NODE_ENV) {
      console.error(chalk.red(
  '+ Error: No configuration file found for "' +
  process.env.NODE_ENV +
  '" environment using development instead'));
    } else {
      console.error(chalk.red(
  '+ Error: NODE_ENV is not defined! ' +
  'Using default development environment'));
    }
    process.env.NODE_ENV = 'development';
  }
  console.log(chalk.white(''));
};

// Initialize global configuration
var initGlobalConfig = function() {
  // Validate the existence of NODE_ENV
  validateEnvironmentVariable();
  
  // Get the default config
  var defaultConfig = require(path.join(process.cwd(), 'config/env/default'));

  // Get the applicable environment config
  var environmentConfig = require(path.join(
    process.cwd(), 'config/env/', process.env.NODE_ENV)) || {};

  // Merge config files
  var config = _.merge(defaultConfig, environmentConfig);
  
  // Read package.json for MEAN.JS project information
  var pkg = require(path.resolve('./package.json'));
  config.packageJson = pkg;


  return config;
};

// Set configuration object
module.exports = initGlobalConfig();
