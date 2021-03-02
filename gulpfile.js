"use strict";

const gulp = require("gulp");
const sass = require('gulp-sass');
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const minifyCss = require("gulp-csso");
const concat = require("gulp-concat");


gulp.task("styles", function() {
    gulp.src("scss/**/*.scss")
        .pipe(sass({
            outputStyle: 'expanded'
            }
            ).on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest("css"))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest("css"));
    })

gulp.task("scripts", function(){
    gulp.src("js/lib/*.js")
        .pipe(concat("libs.min.js"))
        .pipe(gulp.dest("js/"));
})