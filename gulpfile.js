var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var debowerify = require('debowerify');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');
var livereload = require('gulp-livereload');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var spawn = require('child_process').spawn;

var paths = {
  node: [ './models/**/*.js', './routes/**/*.js', '*.js' ],
  client: [ './assets/**/*.js' ],
  browserify: [ './assets/js/main.js' ],
  lint: [ './models/**/*.js', './routes/**/*.js', '*.js', './assets/js/**/*.js' ],
};

var keystoneProcess = null;

gulp.task('browserify', function() {
  var b = browserify({
    entries: paths.browserify,
    debug: !gulp.env.production,
    transform: [babelify, debowerify]
  });

  return b.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
      .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('build', ['browserify']);

gulp.task('keystone', function() {
  if (keystoneProcess) { keystoneProcess.kill(); }

  keystoneProcess = spawn('env', ['node', 'keystone'], {
    detached: false,
    stdio: [ 'ignore', process.stdout, process.stderr ],
  });

  keystoneProcess.unref();

  setTimeout(function() {
    livereload.changed(0);
  }, 3000);
});

gulp.task('lint', function() {
  return gulp.src(paths.lint)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('sendLivereloadChanged', function() {
  livereload.changed();
});

gulp.task('watch', ['keystone'], function() {
  livereload.listen();
  gulp.watch(paths.node, ['lint', 'keystone']);
  gulp.watch(paths.client, ['lint', 'browserify', 'sendLivereloadChanged']);
});
