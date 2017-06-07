'use strict';

module.exports = {
  db: {
    uri: 'mongodb://localhost/lmwam',
    options: {
      user: '',
      pass: '',
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false,
  },
  port: process.env.PORT || 8443,
  log: {
    format: process.env.LOG_FORMAT || 'combined',
    fileLogger: {
      directoryPath: process.env.LOG_DIR_PATH || process.cwd(),
      fileName: process.env.LOG_FILE || 'app.log',
      maxsize: 10485760,
      maxFiles: 2,
      json: false,
    },
  },
};
