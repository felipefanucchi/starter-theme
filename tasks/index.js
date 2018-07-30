import gulp from 'gulp'
import images from './commom/images'
import webpack from './commom/webpack'
import styles from './commom/styles'

const dev = gulp.parallel(styles, webpack, images)

export default dev
