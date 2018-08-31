'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const brsSync = require('browser-sync');
const del = require('del');
const sourcemap = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');


const paths = {
  dirs:{
    src: './src',
    build: './dist',
  },
  html:  './src/main.html',
  styles: './src/styles/**/*.sass',
  scripts: './src/styles/**/*.js',
  img: './src/img/**/*.+(png|jpg|jpeg|svg)'
};

gulp.task('clean', cb => {
  return del(paths.dirs.build, cb);
});

// Development build specific tasks
gulp.task('html', () => {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.dirs.build));
});

gulp.task('styles', () => {
  return gulp.src('./src/main.sass')
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemap.write('.', { sourceRoot: '/' })) // i don't know what is this )))
    .pipe(gulp.dest(paths.dirs.build+'/css'))
    .pipe(brsSync.reload({stream: true}));
});

gulp.task('img', () => {
  return gulp.src(paths.img)
    .pipe(gulp.dest(paths.dirs.build+'/img'));
});

gulp.task('ws', function(cb) {
  brsSync({
    server: {
      baseDir: paths.dirs.build,
      index: 'main.html'
    },
    // port: 4000,
    notify: false,
    open: false,
    // reloadDelay: 1000
  }, cb);
});

// gulp.task('build', gulp.series('clean', 'html', 'styles'));

function reload(done) {
  brsSync.reload();
  done();
}

gulp.task('watch:styles', () => {
  gulp.watch(paths.styles, gulp.series('styles', reload));
});
gulp.task('watch:code', () => {
  gulp.watch(paths.html, gulp.series('html', reload));
});

gulp.task('watch', gulp.parallel('watch:styles', 'watch:code'));

gulp.task('all-files', gulp.parallel('html', 'styles', 'img'));
gulp.task('default', gulp.series(/*'clean',*/ 'all-files', 'ws', 'watch'));
//////////////////////////////////////////////////////////////////////