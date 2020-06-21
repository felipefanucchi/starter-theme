import gulp from 'gulp'
import images from './commom/images'
import webpack from './commom/webpack'
import styles from './commom/styles'
import vendorScripts from './commom/vendorScripts'

const dev = gulp.parallel(styles, webpack, images, vendorScripts)

export default dev
