import gulp from 'gulp';
import config from '../config.json'
import styles from './styles';
import scripts from './webpack';

export default function watch() {
    gulp.watch(
        config.styles.watch,
        styles
    );
    gulp.watch(
        config.scripts.watch,
        scripts
    );
};