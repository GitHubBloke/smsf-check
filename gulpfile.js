var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var debowerify = require('debowerify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');
var livereload = require('gulp-livereload');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var spawn = require('child_process').spawn;

var paths = {
  'src': [ './models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json' ],
  'js': [ './assets/js/app.js' ],
};

var keystoneProcess = null;

gulp.task('javascript', function () {
  var b = browserify({
    entries: paths.js,
    debug: !gulp.env.production,
    transform: [babelify, debowerify]
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
      .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('build', ['javascript']);

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

gulp.task('lint', function(){
  gulp.src(paths.src.concat(paths.js))
    .pipe(jshint())
    .pipe(jshint.reporter(jshintReporter));
});

gulp.task('sendLivereloadChanged', function () {
  livereload.changed();
});

gulp.task('watch', ['keystone'], function () {
  livereload.listen();
  gulp.watch(paths.src, ['lint', 'keystone']);
  gulp.watch(paths.js, ['lint', 'javascript', 'sendLivereloadChanged']);
});
