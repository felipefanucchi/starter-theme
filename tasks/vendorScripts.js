import gulp from 'gulp'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import config from '../gulp.config.json'
import path from 'path'

const dist = config.paths.dist;

const vendorScripts = () => {
  let fullpath = [];
  
  if ( ! config.vendorScripts.length ) return;

  for (let scriptPath of config.vendorScripts) {
    fullpath.push(`${path.resolve(__dirname, `../`)}${scriptPath}`);
  }

  return gulp.src(fullpath, {allowEmpty: false})
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.resolve(__dirname, `../${dist}/js/libs`)))
}

export default vendorScripts;
