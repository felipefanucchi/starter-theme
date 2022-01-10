import gulp from 'gulp';
import config from '../gulp.config.json'
import styles from './styles'
import webpack from './webpack'

export default function watch() {
    gulp.watch(
        config.styles.watch,
        styles
    );
    gulp.watch(
        config.scripts.watch,
        webpack
    );
};