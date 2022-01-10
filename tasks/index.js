import gulp from 'gulp'
import images from './images'
import webpack from './webpack'
import styles from './styles'
import watch from './watch'
import vendorScripts from './vendorScripts'
import browserSync from './browserSync'

const start = gulp.parallel(
    styles,
    webpack,
    images,
    browserSync,
    vendorScripts,
    gulp.series(watch)
)

export default start
