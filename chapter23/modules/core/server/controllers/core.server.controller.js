'use strict';

// Render the main application page
exports.renderIndex = function(req, res) {
  res.render('modules/core/server/views/index');
};

// Render the server not found responses
exports.renderNotFound = function(req, res) {
  res.status(404).format({
    'text/html': function() {
      res.render('modules/core/server/views/404', {
        url: req.originalUrl,
      });
    },
    'application/json': function() {
      res.json({
        error: 'Path not found',
      });
    },
    default: function() {
      res.send('Path not found');
    },
  });
};

// Render the server error page
exports.renderServerError = function (req, res) {
  res.status(500).render('modules/core/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
};

