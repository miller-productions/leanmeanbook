'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
  app: {
    title: defaultEnvConfig.app.title + ' - Test Environment',
  },
  db: {
    uri: 'mongodb://localhost/lmwam-test',
    options: {
      user: '',
      pass: '',
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false,
  },
  port: process.env.PORT || 3001,
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
};
