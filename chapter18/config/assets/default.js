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
  },
};
