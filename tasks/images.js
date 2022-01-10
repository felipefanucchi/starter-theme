import gulp from 'gulp'
import minify from 'gulp-imagemin'
import newer from 'gulp-newer'
import config from '../gulp.config.json'
import path from 'path'

const src = config.paths.src;
const dist = config.paths.dist;

const srcImages = path.resolve(__dirname, `../${src}/images/**/*`);
const distImages = path.resolve(__dirname, `../${dist}/images`);

const images = e =>
  gulp
    .src(srcImages)
    .pipe(newer(srcImages))
    .pipe(
      minify([
        minify.gifsicle({ interlaced: true }),
        minify.jpegtran({ progressive: true }),
        minify.optipng({ optimizationLevel: 5 }),
        minify.svgo({
          plugins: [
            {
              removeViewBox: false,
              collapseGroups: true
            }
          ]
        })
      ])
    )
    .pipe(gulp.dest(distImages));

export default images;
