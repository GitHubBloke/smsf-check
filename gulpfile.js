var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  jshintReporter = require('jshint-stylish'),
  livereload = require('gulp-livereload'),
  browserify = require('gulp-browserify'),
  spawn = require('child_process').spawn;

var paths = {
  'src': [ './models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json' ],
  'js': [ './assets/js/**/*.js' ],
};

var keystoneProcess = null;

gulp.task('build', function () {
  gulp.src(paths.js)
    .pipe(browserify({ debug : !gulp.env.production }))
    .pipe(gulp.dest('./public/js'));
});

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
  gulp.watch(paths.js, ['lint', 'build', 'sendLivereloadChanged']);
});
