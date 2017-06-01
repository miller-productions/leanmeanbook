'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');

// Unified Watch Object
var watchFiles = {
  serverJS: ['gulpfile.js', 'server.js'],
};

// Start server.js and watch for changes in all .js files
gulp.task('nodemon', function() {
  return nodemon({
    verbose: true,
    script: 'server.js',
    ext: 'js',
    watch: watchFiles.serverJS,
  });
});

// Detect errors and potential problems in the js code.
gulp.task('jshint', function() {
  return gulp.src(watchFiles.serverJS)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

// Watch files for changes
gulp.task('watch', function() {
  // Add watch rules
  gulp.watch(watchFiles.serverJS, ['jshint']);
});

// Lint task(s)
gulp.task('lint', ['jshint']);

// Default task
gulp.task('default', ['lint', 'nodemon', 'watch']);

