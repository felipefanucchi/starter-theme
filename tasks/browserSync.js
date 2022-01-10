import browserSync from 'browser-sync'

const sync = browserSync.create();

const serve = () => {
    sync.init({
        server: {
            baseDir: './'
        }
    });
}

export default serve