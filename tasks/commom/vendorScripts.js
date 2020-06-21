import gulp from 'gulp'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import config from '../config.json'
import path from 'path'

const dist = config.paths.dist;

console.log(config.vendorScripts);

const vendorScripts = () => {
  let fullpath = [];
  for (let scriptPath of config.vendorScripts) {
    fullpath.push(`${path.resolve(__dirname, `../../`)}${scriptPath}`);
  }

  return gulp.src(fullpath, {allowEmpty: false})
  .pipe(concat('bundle.js'))
  .pipe(uglify())
  .pipe(gulp.dest(path.resolve(__dirname, `../${dist}/js/libs`)))
}

export default vendorScripts;
