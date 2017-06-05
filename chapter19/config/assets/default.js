'use strict';

module.exports = {
  client: {
    lib: {
      css: [
      ],
      js: [
        // Bower:js
        'public/lib/angular/angular.js',
      ],
    },
    css: [
      'modules/*/client/css/*.css',
    ],
    js: [
      'modules/*/client/*.js',
      'modules/*/client/**/*.js',
      'modules/core/client/app/config.js',
      'modules/core/client/app/init.js',

    ],
    img: [
      'modules/**/*/img/**/*.jpg',
      'modules/**/*/img/**/*.png',
      'modules/**/*/img/**/*.gif',
      'modules/**/*/img/**/*.svg',
    ],
  },
  server: {
    gulpConfig: ['gulpfile.js'],
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
  },
};
