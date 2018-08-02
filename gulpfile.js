// Gulp.js configuration
var // Modules
  gulp = require('gulp'),
  newer = require('gulp-newer'),
  imagemin = require('gulp-imagemin'),
  concat = require('gulp-concat'),
  stripdebug = require('gulp-strip-debug'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  assets = require('postcss-assets'),
  autoprefixer = require('autoprefixer'),
  mqpacker = require('css-mqpacker'),
  babel = require('gulp-babel'),
  webserver = require('gulp-webserver'),
  sassGlob = require('gulp-sass-glob'),

  // Dev mode?
  devBuild = (process.env.NODE_ENV !== 'production'),
  // Windows Powershell
  // $env:NODE_ENV="production"

  // Folders
  folder = {
    src: 'src/',
    dist: 'dist/'
  };

// Image Processing
gulp.task('images', function () {
  var out = folder.dist + 'images/';

  return gulp.src(folder.src + 'images/**/*')
    .pipe(newer(out))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(out));
});

// JavaScript processing
gulp.task('js', ['libs'], function () {
  var jsbuild = gulp.src([folder.src + 'js/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(babel({
      presets: ['env']
    }));

  // Uglify and remove consoles/debugger in prod mode
  if (!devBuild) {
    jsbuild = jsbuild
      .pipe(uglify())
      .pipe(stripdebug());
  }

  return jsbuild.pipe(gulp.dest(folder.dist + 'js/'));
});

// Javascript third party processing
gulp.task('libs', function () {
  gulp.src([
    //'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js'
  ])
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest(folder.dist + 'js/libs/'));
})

// CSS Task
gulp.task('css', ['images'], function () {
  var styleCss = 'nested';
  var options = {
    relative: true,
    basePath: 'dist/',
    loadPaths: ['images/', 'fonts/'],
    cachebuster: true
  };
  var plugins = [
    assets(options),
    autoprefixer({ browsers: ['last 2 versions', '> 2%'], cascade: false }),
    mqpacker
  ];

  if (!devBuild) {
    styleCss = 'compressed'
  }

  return gulp.src(folder.src + 'scss/main.scss')
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: styleCss,
      imagePath: 'images/',
      precision: 3,
      errLogToConsole: true,
      includePaths: ['scss']
    }))
    .pipe(postcss(plugins))
    .pipe(gulp.dest(folder.dist + 'css/'));
});

// This is a webserver ONLY for static files.
gulp.task('serve', function () {
  gulp.src('../')
    .pipe(webserver({
      fallback: 'index.html',
      livereload: true
    }));
});

// Fonts
gulp.task('fonts', function () {
  return gulp.src(folder.src + 'fonts/*')
    .pipe(gulp.dest(folder.dist + 'fonts/'))
});

// Run all Tasks
gulp.task('run', ['css', 'js', 'fonts']);

// Watch All Tasks
gulp.task('watch', function () {
  gulp.watch(folder.src + 'images/**/*', ['images']);

  gulp.watch(folder.src + 'js/**/*', ['js']);

  gulp.watch(folder.src + 'scss/**/*', ['css']);

});

gulp.task('default', ['serve', 'run', 'watch']);
