// Gulp.js configuration
var // Modules
    gulp = require('gulp'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    htmlclean = require('gulp-htmlclean'),
    concat = require('gulp-concat'),
    deporder = require('gulp-deporder'),
    stripdebug = require('gulp-strip-debug'),
    uglify = require('gulp-uglify'),

    // Dev mode?
    devBuild = (process.env.NODE_ENV !== 'production'),

    // Folders
    folder = {
        src: 'src/',
        dist: 'dist/'
    };

// Image Processing
gulp.task('images', function() {
    var out = folder.dist + 'images/';

    return gulp.src(folder.src + 'images/**/*')
        .pipe(newer(out))
        .pipe(imagemin({ optimizationLevel: 5 }))
        .pipe(gulp.dest(out));
});

// HTML Processing
gulp.task('html', ['images'],function() {
    var out = folder.dist + 'templates/',
        page = gulp.src(folder.src + 'templates/**/*')
        .pipe(newer(out));
    
    // Minify prod code
    if(!devBuild) {
        page = page.pipe(htmlclean());
    }

    return page.pipe(gulp.dest(out));
});

// JavaScript processing
gulp.task('js', function() {
    var jsbuild = gulp.src(folder.src + 'js/**/*')
    .pipe(deporder())
    .pipe(concat('script.js'));

    // Uglify and remove consoles/debugger in prod mode
    if (!devBuild) {
        jsbuild = jsbuild
            .pipe(stripdebug())
            .pipe(uglify());
    }

    return jsbuild.pipe(gulp.dest(folder.dist + 'js/'));
});