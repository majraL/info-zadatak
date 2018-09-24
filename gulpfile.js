var gulp = require ('gulp');
  browserSync = require ('browser-sync').create(),
  sass = require('gulp-sass'),
  cleanCSS = require ('gulp-clean-css'),
  concat = require('gulp-concat'),
  nunjucks = require('gulp-nunjucks-render'),
  rename = require ('gulp-rename'),
  uglify = require ('gulp-uglify'),
  notify = require ('gulp-notify'),
  svgmin = require('gulp-svgmin'),
  zip = require('gulp-zip'),
  stripCssComments = require('gulp-strip-css-comments'),
  replace = require('gulp-replace'),
  del = require('del'),
  sprite = require('gulp-svg-sprite'),
  tinypng = require ('gulp-tinypng-compress');


//---------------------------------------------------Node dir-----------------------------------------------------------
var path = {
  npm: 'node_modules/'
};
//----------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------BrowserSync---------------------------------------------------------
gulp.task('browser-sync', function () {
  return browserSync.init({
    server: {
      baseDir: "build"
    }
  });
});
//----------------------------------------------------------------------------------------------------------------------


//-------------------------------------------CSS minify for build-------------------------------------------------------
gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({
      includePaths: [path.npm]
    }).on('error', function (err) { return notify().write(err); }))
    .pipe(gulp.dest('src/css'))
});
//----------------------------------------------------------------------------------------------------------------------


//--------------------------------------------Compile CSS task----------------------------------------------------------

gulp.task('css', ['sass'], function () {
  return gulp.src([
    path.npm + 'normalize.css/normalize.css',
    'src/css/app/app.css'
  ])
  .pipe(concat('main.css'))
  .pipe(cleanCSS().on('error', function (err) { return notify().write(err); }))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(stripCssComments({
    preserve: false
  }))
  .pipe(gulp.dest('build/css'))
});


//----------------------------------------HTML copy, find and replace paths---------------------------------------------
gulp.task('html', function () {
  return gulp.src('src/html/app/pages/*.html')
    .pipe(nunjucks({
    }).on('error', function (err) { return notify().write(err); }))
    .pipe(gulp.dest('build'))
});
//----------------------------------------------------------------------------------------------------------------------


//-----------------------------------------------Build javascript task--------------------------------------------------
gulp.task('js', function () {
  return gulp.src([
    path.npm + 'jquery/dist/jquery.js',

    // Email suggestions plugin
    // path.npm + 'mailcheck/src/mailcheck.min.js',

    // Telephone country check
    // path.npm + 'intl-tel-input/build/js/intlTelInput.js',
    'src/scripts/**/*.js'
  ])
  
    .pipe(concat('app.js'))
    .pipe(gulp.dest('src/js/app/'))

    .pipe(concat('main.js'))
    .pipe(uglify().on('error', function(err) {return notify().write(err);}))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build/js'))
});
//----------------------------------------------------------------------------------------------------------------------


//------------------------------------------------------TinyPNG task----------------------------------------------------
gulp.task('png', function() {
  return gulp.src(['src/media/**/*.png', 'src/media/**/*.jpg'])
    .pipe(tinypng({
      key: 'qvtT2BPQtOvhT-97B47ELxqa-Lcq5FUO',
      sigFile: 'images/.tinypng-sigs',
      log: true
    }))
    .pipe(gulp.dest('build/media'));
});
//----------------------------------------------------------------------------------------------------------------------


//---------------------------------------------SVG sprite task----------------------------------------------------------
gulp.task('sprite', function () {
  return gulp.src('src/media/symbols/*.svg')
    .pipe(sprite({
      mode: {
        css: {
          render: {
            scss: true,
            scss: {
              dest: '../scss/app/02_tools/_sprite',
            },
          },
          bust: false,
          sprite: '../media/sprite/sprite',
        }
      }
    }).on('error', function (err) { return notify().write(err); }))
    .pipe(gulp.dest('src'))
});
//----------------------------------------------------------------------------------------------------------------------


//-------------------------------------------Sprite + minify all SVGs---------------------------------------------------
gulp.task('svg', ['sprite'], function () {
  return gulp.src(['src/media/**/*.svg', '!src/media/symbols/*.svg'])
    .pipe(svgmin())
    .pipe(gulp.dest('build/media'))
});
//----------------------------------------------------------------------------------------------------------------------


//--------------------------------------Compress all build files to build.zip-------------------------------------------
gulp.task('zip', function () {
  return gulp.src('build/**/*.*')
    .pipe(zip('build.zip'))
    .pipe(gulp.dest('./'));
});
//----------------------------------------------------------------------------------------------------------------------


gulp.task('watch', function () {
  gulp.watch(['src/media/**/*.svg', '!src/media/sprite/*.svg'], ['svg']).on('change', browserSync.reload);
  gulp.watch('src/media/**/*.png', ['png']).on('change', browserSync.reload);
  gulp.watch('src/scripts/**/*.js', ['js']).on('change', browserSync.reload);
  gulp.watch('src/scss/**/*.scss', ['css']).on('change', browserSync.reload);
  gulp.watch('src/html/**/*.html', ['html']).on('change', browserSync.reload);
});


//-------------------------------------------CSS minify for build-------------------------------------------------------
gulp.task('clean', function () {
  del(['build']);
});
//----------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------Gulp.js build task---------------------------------------------------
gulp.task('app', [
  'png',
  'svg',
  'css',
  'js',
  'html',
  'browser-sync',
  'watch'], function(app){
    console.log('\x1b[32m', '----------> App task successfully launched <----------')
    return app;
  } );
//----------------------------------------------------------------------------------------------------------------------
