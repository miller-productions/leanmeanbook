'use strict';

module.exports = function(app) {
  // Root routing
  var core = require('../controllers/core.server.controller');

  // Default application route
  app.route('/*').get(core.renderIndex);
};
