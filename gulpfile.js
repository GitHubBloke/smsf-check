var _ = require('lodash');
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var debowerify = require('debowerify');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var gutil = require('gulp-util');
var http = require('http');
var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');
var livereload = require('gulp-livereload');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var spawn = require('child_process').spawn;
var watchify = require('watchify');

var paths = {
  node: [ './models/**/*.js', './routes/**/*.js', '*.js' ],
  client: [ './assets/**/*.js' ],
  browserify: [ './assets/js/main.js' ],
  lint: [ './models/**/*.js', './routes/**/*.js', '*.js', './assets/js/**/*.js' ],
  less: [ './public/styles/**/*.less' ],
  css: [ '/styles/site.css' ]
};

var keystoneProcess = null;

gulp.task('lint', function() {
  return gulp.src(paths.lint)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('browserify', function() { return bundle(); });
gulp.task('build', [ 'browserify' ]);

gulp.task('keystone', function() {
  if (keystoneProcess) { keystoneProcess.kill(); }

  var stdioOptions = [ 'ignore', process.stdout, process.stderr ];
  keystoneProcess = spawn('env', ['node', 'keystone'], { detached: false, stdio: stdioOptions });
  keystoneProcess.unref();

  var livereloadTimer = setInterval(function() {
    http.get({ host: 'localhost', port: 3000, path: '/' }, function(res) {
      livereload.changed('/');
      clearInterval(livereloadTimer);
      console.log('Site reloaded after server restarted...');
    }).on('error', function(e) {
      console.log('Reloading site but not yet ready, retrying in 1 second...');
    });
  }, 1000);
});

gulp.task('watch', [ 'keystone' ], function() {
  livereload.listen();

  gulp.watch(paths.node, [ 'keystone' ]);

  gulp.watch(paths.less).on('change', function(event) {
    paths.css.forEach(function(path) {
      http.get({ host: 'localhost', port: 3000, path: path }, function() {
        livereload.changed(path);
      });
    });
  });

  process.stdin.resume();

  function exitHandler(options, err) {
    if (options.cleanup) { keystoneProcess.kill(); }
    if (err) console.log(err.stack);
    /* eslint-disable no-process-exit */
    if (options.exit) { process.exit(); }
    /* eslint-enable no-process-exit */
  }

  process.on('exit', exitHandler.bind(null, { cleanup: true }));
  process.on('SIGINT', exitHandler.bind(null, { exit: true }));
  process.on('uncaughtException', exitHandler.bind(null, { exit: true }));

  return bundle(true);
});

function bundle(watch) {
  var b = browserify(_.assign({}, watchify.args, {
    entries: paths.browserify,
    debug: watch,
    transform: [babelify, debowerify]
  }));

  if (watch) {
    b = watchify(b);
    b.on('update', rebundle);
    b.on('log', gutil.log);
  }

  function rebundle() {
    return b.bundle()
        .on('error', gutil.log)
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
        .on('error', gutil.log)
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./public/js/'))
      .pipe(livereload());
  }

  return rebundle();
}
