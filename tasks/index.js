import gulp from 'gulp'
import images from './commom/images'
import webpack from './commom/webpack'
import styles from './commom/styles'
import watch from './commom/watch'
import vendorScripts from './commom/vendorScripts'

const start = gulp.parallel(
    styles,
    webpack,
    images,
    gulp.series(watch)
)

export default start
