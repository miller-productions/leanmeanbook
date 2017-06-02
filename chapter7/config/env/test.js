'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
  app: {
    title: defaultEnvConfig.app.title + ' - Test Environment',
  },
  port: process.env.PORT || 3001,
};
