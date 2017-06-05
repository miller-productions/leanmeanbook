'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
  app: {
    title: defaultEnvConfig.app.title + ' - Development Environment',
  },
  db: {
    uri: 'mongodb://localhost/lmwam-dev',
    options: {
      user: '',
      pass: '',
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false,
  },
  log: {
    format: 'dev',
    fileLogger: {
      directoryPath: process.cwd(),
      fileName: 'app.log',
      maxsize: 10485760,
      maxFiles: 2,
      json: false,
    },
  },
  livereload: true,
};
