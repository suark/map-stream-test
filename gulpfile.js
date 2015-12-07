// Dependencies
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var wiredep = require('wiredep').stream;

gulp.task('serve', function() {
  // listen for changes
  livereload.listen();
  // configure nodemon
  nodemon({
    // the script to run the app
    script: 'server.js',
    ext: 'js html css',
  }).on('restart', function() {
    // when the app has restarted, run livereload.
    gulp.src('server.js')
      .pipe(livereload())
      .pipe(notify('Reloading page, please wait...'));
  })
});

gulp.task('default', ['serve']);