const gulp = require('gulp');
const config = require('../config');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglifyjs');
const rename = require('gulp-rename');
const server = require('./server');

gulp.task('js', () => {
  browserify(config.src.jsEntry)
    .transform('babelify', { presets: ['es2015'] })
    .bundle()
    .on('error', (err) => {
      console.log(err.stack);
    })
    .pipe(source('app.js'))
    .pipe(gulp.dest(config.src.js));
});

gulp.task('js:watch', () => {
  gulp.watch(`${config.src.js}/**/*.js`, ['js', server.reload]);
});

gulp.task('js:build', () => {
  gulp
    .src(`${config.src.js}/*.js`)
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.dest.js));
});

/* OLD Task for simple concat javascript */
// gulp.task('js', () => {
//   gulp
//     .src(`${config.src.js}/modules/app.js`)
//     .pipe(plumber())
//     .pipe(rigger())
//     .pipe(babel({
//       presets: [
//         [
//           'env',
//           {
//             targets: {
//               browsers: ['last 2 versions', 'safari >= 7'],
//             },
//           },
//         ],
//       ],
//     }))
//     .pipe(plumber.stop())
//     .pipe(gulp.dest(`${config.src.js}`));
// });
