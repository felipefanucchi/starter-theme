import gulp from 'gulp'
import minify from 'gulp-imagemin'
import newer from 'gulp-newer'
import config from '../config.json'
import path from 'path'

const src = config.paths.src;
const dest = config.paths.dist;

const images = e =>
  gulp
    .src(path.resolve('src/images/'), { allowEmpty: true })
    .pipe(minify({
      progressive: true,
      optimizationLevel: 5
    }))
    .pipe(gulp.dest(path.resolve('dist/')))

export default images;
