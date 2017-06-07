'use strict';

var defaultAssets = require('./config/assets/default');
var _ = require('lodash');
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var runSequence = require('run-sequence');
// Module dependencies
var testAssets = require('./config/assets/test');
var glob = require('glob');
var path = require('path');

// Globals
var changedTestFiles = [];

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

// Watch server files, including tests
gulp.task('watch:server:run-tests', function() {
  // Add Server Test file rules
  gulp.watch(
    [testAssets.tests.server, defaultAssets.server.allJS], ['test:server'])
  .on('change', function(file) {

    changedTestFiles = [];

    // Iterate through server test glob patterns
    _.forEach(testAssets.tests.server, function(pattern) {
      // Determine if the changed (watched) file is a server test
      _.forEach(glob.sync(pattern), function(f) {
        var filePath = path.resolve(f);

        if (filePath === path.resolve(file.path)) {
          changedTestFiles.push(f);
        }
      });
    });

    plugins.livereload.changed();
  });
});

gulp.task('mocha', function(done) {
  var testSuites = changedTestFiles.length ? 
    changedTestFiles : testAssets.tests.server;
  var error;

  gulp.src(testSuites)
    .pipe(plugins.mocha({
      reporter: 'spec',
      timeout: 10000,
    }))
    .on('error', function(err) {
      // If an error occurs, save it
      error = err;
    })
    .on('end', function() {
      // When the tests are done...
      // <placeholder for later> cleanup here, e.g. database connection
      // Then pass the error back to gulp
      done(error);
    });

});

gulp.task('test:server', function(done) {
  runSequence('env:test', 'lint', 'mocha', done);
});

// Lint task(s)
gulp.task('lint', ['jshint']);

// Default task
gulp.task('default', function(done) {
  runSequence('env:dev', 'lint', ['nodemon', 'watch'], done);
});

