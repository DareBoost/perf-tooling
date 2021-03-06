/**
 *
 *  how to speedup a landingpage with gulp.
 *
 */

'use strict';

// Require the needed packages
var gulp        = require( 'gulp' ),
    gutil       = require( 'gulp-util'),
    less        = require( 'gulp-less' ),
    prefix      = require( 'gulp-autoprefixer' ),
    clean       = require( 'gulp-clean' ),
    minifyCSS   = require( 'gulp-minify-css' ),
    imagemin    = require( 'gulp-imagemin' ),
    size        = require( 'gulp-size' ),
    watch       = require( 'gulp-watch' ),
    connect     = require( 'gulp-connect' ),

    // all paths for watching and regeneration
    PATHS      = {
      less     : './less/**/*.less'
    },

    stylesHash = '';


/*******************************************************************************
 * STYLE TASK
 *
 * this task is responsible for the style files
 * - it will delete old generated css files
 * - we will compile the less files to css
 * - we will minify the css files
 * - hash the files
 * - and save the new file name in the 'stylesHash' variable
 */
gulp.task( 'styles', [ 'clean-styles' ], function () {
  return gulp.src( 'less/main.less' )
    .pipe( less() )
    .pipe( minifyCSS() )
    .pipe( prefix( 'last 1 version', '> 1%', 'ie 8', 'ie 7' ) )
    .pipe( gulp.dest( 'css/' ) );
});


gulp.task( 'clean-styles' , function () {
  // delete old generated stlye/css files
  gulp.src( 'css/' )
    .pipe( clean() );
});


/*******************************************************************************
 * IMAGE TASK
 *
 * this task is responsible for image optimization
 *  - it will optimize all images in the assets folder and move them to
 *    the public folder
 */
gulp.task( 'images', function () {
  return gulp.src( ASSETS_DIR + 'images/**/*' )
    .pipe(imagemin())
    .pipe(gulp.dest( PUBLIC_DIR + 'images' ));
});


/*******************************************************************************
 * SIZE
 *
 * this task will show you file sizes after build process
 */
gulp.task( 'size' , function() {
  gutil.log( '********************************' );
  gutil.log( '--> current file sizes not gzipped: ' );

  return gulp.src( PUBLIC_DIR + '/**/*' )
    .pipe( size( { showFiles : true } ) )
    .pipe( gulp.dest( PUBLIC_DIR ) );
});


/*******************************************************************************
 * this task will start connect server including livereload
 */
gulp.task( 'connect', function() {
  connect.server( {
    root       : 'public',
    livereload : true
  });
});


/*******************************************************************************
 * BUILD
 *
 * run all build related tasks with:
 *
 *  $ gulp build
 *
 */
gulp.task( 'build', [ 'styles' ] );


/*******************************************************************************
 * this task will kick off the watcher for JS, CSS, HTML files
 * for easy and instant development
 */
gulp.task( 'watch', function() {
  gulp.watch( 'less/**/*.less', [ 'styles' ] );
});


/*******************************************************************************
 * DEV
 *
 * run all build related tasks, kick of server at 8080
 * and enable file watcher with:
 *
 * $ gulp dev
 *
 */
gulp.task( 'dev', [ 'build', 'connect', 'watch' ] );


/**
 * Default gulp task will run all landingpage task.
 * This is just a shorcut for $ gulp landingpage
 *
 *  $ gulp
 *
 */
gulp.task( 'default', [ 'build' ] );
