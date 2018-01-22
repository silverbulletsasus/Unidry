var gulp        = require('gulp');
var browserSync = require('browser-sync');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('disk/main.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(concat('styles.scss'))
        .pipe(gulp.dest('scss/merged'))        
        .pipe(sass())
        .pipe(rename('main.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('html/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['html/js/main.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('html/js/merged'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('html/js'));
});

gulp.task('watch', function() {
    browserSync.init({
        proxy: 'http://localhost:1000/unidry/index.php'
    });

    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('html/js/*.js', ['lint', 'scripts']);
    gulp.watch(['html/js/*.js'], browserSync.reload);
    gulp.watch(['html/css/*'], browserSync.reload);    
    gulp.watch(['html/*'], browserSync.reload);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);