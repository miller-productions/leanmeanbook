'use strict';

var _ = require('lodash');
var glob = require('glob');
var path = require('path');
var chalk = require('chalk');

// Get files by glob patterns
var getGlobbedPaths = function(globPatterns, excludes) {
  // URL paths regex
  var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

  // The output array
  var output = [];

  // If glob pattern is array then we use each pattern in a recursive way
  // Otherwise we use glob
  if (_.isArray(globPatterns)) {
    globPatterns.forEach(function(globPattern) {
      output = _.union(output, getGlobbedPaths(globPattern, excludes));
    });
  } else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      var files = glob.sync(globPatterns);
      if (excludes) {
        files = files.map(function(file) {
          if (_.isArray(excludes)) {
            for (var i in excludes) {
              file = file.replace(excludes[i], '');
            }
          } else {
            file = file.replace(excludes, '');
          }
          return file;
        });
      }
      output = _.union(output, files);
    }
  }
  return output;
}; 

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

// Initialize global configuration files
var initGlobalConfigFiles = function (config, assets) {
  // Appending files
  config.files = {
    server: {},
  };

  // Setting Globbed config files
  config.files.server.configs = getGlobbedPaths(assets.server.config);
};


// Initialize global configuration
var initGlobalConfig = function() {
  // Validate the existence of NODE_ENV
  validateEnvironmentVariable()
  
  // Get the default assets
  var defaultAssets = require(path.join(process.cwd(), 
    'config/assets/default'));

  // Get the current assets
  var environmentAssets = require(path.join(process.cwd(),
    'config/assets/', process.env.NODE_ENV)) || {};

  // Merge assets
  var assets = _.merge(defaultAssets, environmentAssets);
  
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
  
  // Initialize global globbed files
  initGlobalConfigFiles(config, assets);

  // Expose configuration utilities
  config.utils = {
    getGlobbedPaths: getGlobbedPaths,
  };

  return config;
};

// Set configuration object
module.exports = initGlobalConfig();
