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
};
