'use strict';

var defaultAssets = require('./config/assets/default');
var _ = require('lodash');
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var runSequence = require('run-sequence');

// Set NODE_ENV to 'test'
gulp.task('env:test', function() {
  process.env.NODE_ENV = 'test';
});

// Set NODE_ENV to 'development'
gulp.task('env:dev', function() {
  process.env.NODE_ENV = 'development';
});

// Set NODE_ENV to 'production'
gulp.task('env:prod', function() {
  process.env.NODE_ENV = 'production';
});

// Start server.js and watch for changes in all .js files
gulp.task('nodemon', function() {
  return plugins.nodemon({
    verbose: true,
    script: 'server.js',
    ext: 'js',
    watch: defaultAssets.server.allJS,
  });
});

// Detect errors and potential problems in the js code.
gulp.task('jshint', function() {
  var assets = _.union(
    defaultAssets.server.gulpConfig,
    defaultAssets.server.allJS
  );

  return gulp.src(assets)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.jshint.reporter('fail'));
});

// Watch files for changes
gulp.task('watch', function() {
  // Start livereload
  plugins.livereload.listen();

  // Add watch rules
  gulp.watch(defaultAssets.server.allJS, ['jshint'])
    .on('change', plugins.livereload.changed);
});

// Lint task(s)
gulp.task('lint', ['jshint']);

// Default task
gulp.task('default', function(done) {
  runSequence('env:dev', 'lint', ['nodemon', 'watch'], done);
});

