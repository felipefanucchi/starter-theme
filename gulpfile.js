// Gulp.js configuration
var // Modules
    gulp = require('gulp'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    htmlclean = require('gulp-htmlclean'),
    concat = require('gulp-concat'),
    //deporder = require('gulp-deporder'),
    stripdebug = require('gulp-strip-debug'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    assets = require('postcss-assets'),
    autoprefixer = require('autoprefixer'),
    mqpacker = require('css-mqpacker'), // Estudar plugin.
    babel = require('gulp-babel'),
    svgSprites = require('gulp-svg-sprites'),

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
gulp.task('images', function() {
    var out = folder.dist + 'images/';

    return gulp.src(folder.src + 'images/**/*')
        .pipe(newer(out))
        .pipe(imagemin({ optimizationLevel: 5 }))
        .pipe(gulp.dest(out));
});

// JavaScript processing
gulp.task('js', function() {
    var jsbuild = gulp.src(folder.src + 'js/**/*')
    //.pipe(deporder())
    .pipe(concat('script.js'))
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

// CSS Task
gulp.task('css', ['images', 'sprites'], function() {
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

    if(!devBuild) {
        styleCss = 'compressed'
    }

    return gulp.src(folder.src + 'scss/main.scss')
        .pipe(sass({
            outputStyle: styleCss,
            imagePath: 'images/',
            precision: 3,
            errLogToConsole: true
        }))
        .pipe(postcss(plugins))
        .pipe(gulp.dest(folder.dist + 'css/'));
});

//SVG sprite
gulp.task('sprites', function() {
  var config = {
    transformData: function (data, config) {
      console.log(data, config);
      return data
    },
    templates: {
      css: require('fs').readFileSync(folder.src + 'scss/sprites/template-sprites.scss', 'utf-8')
    },
    selector: "icon-%f"
  };

  return gulp.src(folder.src + 'svg/**/*.svg')
        .pipe(svgSprites(config))
        .pipe(gulp.dest(folder.dist + './'));
});

// Run all Tasks
gulp.task('run', ['css', 'js']);

// Watch All Tasks
gulp.task('watch', function() {
    gulp.watch(folder.src + 'images/**/*', ['images']);

    gulp.watch(folder.src + 'js/**/*', ['js']);

    gulp.watch(folder.src + 'svg/**/*', ['sprites']);

    gulp.watch(folder.src + 'scss/**/*', ['css']);

});

gulp.task('default', ['run', 'watch']);
