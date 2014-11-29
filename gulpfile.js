'use strict';

var del = require('del');
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var istanbul = require('gulp-istanbul');
var jasmine = require('gulp-jasmine');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var karma = require('karma').server;
var run = require('gulp-run');

var moduleName = 'foo';

var paths = {
  benchmark: ['benchmark/*.js'],
  coverage: 'coverage/',
  dist: 'dist/',
  karmaConf: __dirname + '/karma.conf.js',
  src: ['index.js'],
  test: ['test/**/*.spec.js']
};

var defaultTasks = ['lint', 'test', 'test-browser', 'bench'];

gulp.task('lint', function() {
  return gulp.src([].concat(__filename, paths.benchmark, paths.karmaConf, paths.src, paths.test))
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function() { // synchronous
  del([paths.coverage, paths.dist]);
});

gulp.task('dist', ['clean'], function() {
  return gulp.src(paths.src, { read: false })
    .pipe(plumber())
    .pipe(browserify({
      debug: true, // generate sourcemaps
      insertGlobals: false,
      standalone: moduleName
    }))
    .pipe(rename({ basename: moduleName }))
    .pipe(gulp.dest(paths.dist))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('test', ['dist'], function(cb) {
  return gulp.src(paths.src)
    .pipe(plumber())
    .pipe(istanbul())
    .on('finish', function() {
      gulp.src(paths.test)
        .pipe(jasmine({
          verbose: true,
          includeStackTrace: true
        }))
        .on('error', function(err) {
          cb(err);
        })
        .pipe(istanbul.writeReports({
          dir: paths.coverage,
          reporters: ['lcov', 'text']
        }));
    });
});

gulp.task('test-browser', ['dist'], function(cb) {
  karma.start({
    configFile: paths.karmaConf,
    singleRun: true
  }, cb);
});

gulp.task('bench', function(cb) {
  run('node_modules/.bin/matcha').exec(cb);
});

gulp.task('watch', defaultTasks, function() {
  gulp.watch([].concat(paths.karmaConf, paths.src, paths.test), defaultTasks);
});

gulp.task('default', defaultTasks);
