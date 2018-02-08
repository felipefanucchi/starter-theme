// Gulp.js configuration
var // Modules
    gulp = require('gulp'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    htmlclean = require('gulp-htmlclean'),
    concat = require('gulp-concat'),
    deporder = require('gulp-deporder'), // Estudar plugin.
    stripdebug = require('gulp-strip-debug'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'), // Estudar plugin.
    assets = require('postcss-assets'), // Estudar plugin.
    autoprefixer = require('autoprefixer'),
    mqpacker = require('css-mqpacker'), // Estudar plugin.
    cssnano = require('cssnano'),

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

// CSS Task
gulp.task('css', ['images'], function() {
    var postCssOpts = [
        assets({ loadPaths: ['images/'] }),
        autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
        mqpacker,
        cssnano
    ];
    
    if(!devBuild) {
        postCssOpts.push();
    }

    return gulp.src(folder.src + 'scss/main.scss')
        .pipe(sass({
            outputStyle: 'nested',
            imagePath: 'images/',
            precision: 3,
            errLogToConsole: true
        }))
        .pipe(postcss(postCssOpts))
        .pipe(gulp.dest(folder.dist + 'css/'));
});

// Run all Tasks

gulp.task('run', ['html', 'css', 'js']);

// Watch All Tasks
gulp.task('watch', function() {
    gulp.watch(folder.src + 'images/**/*', ['images']);

    gulp.watch(folder.src + 'templates/**/*', ['html']);
    
    gulp.watch(folder.src + 'js/**/*', ['js']);

    gulp.watch(folder.src + 'scss/**/*', ['css']);

});

gulp.task('default', ['run', 'watch']);

// Remover NODE_ENV
// Inserir Transpiler ES6 to ES5
// Estudar plugin sinalizados acima.
