/**
 * Created by:  malyusha 07.04.16
 * Email:       lovecoding@yandex.ru
 * Developer:   Igor Malyuk
 */
var gulp = require('gulp');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var svgstore = require('gulp-svgstore');
var Elixir = require('laravel-elixir');

var config = Elixir.config;

/*
|--------------------------------------------------------------------------
| SVG sprites compilation task
|--------------------------------------------------------------------------
|
| This task compiles svg sprites into one.
|
*/

Elixir.extend('svg', function(src, output, options) {
    var paths;
    options = options || {};

    config.svg = {
        folder: 'svg',
        outputFolder: 'svg',
        imagemin: {
            multipass: true
        },
        svgstore: {}
    };

    paths = prepGulpPaths(src, output);

    new Elixir.Task('svg', function() {
        this.log(paths.src, paths.output);

        var errorHandler = function(e) {
            new Elixir.Notification.error(e, 'SVG compilation failed');
            this.emit('end');
        };

        return gulp.src(paths.src.path)
            .pipe(svgstore(options.svgstore || config.svg.svgstore))
            .pipe(imagemin(options.imagemin || config.svg.imagemin))
            .pipe(rename(options.name || 'sprite.svg'))
            .on('error', errorHandler)
            .pipe(gulp.dest(paths.output.baseDir))
            .pipe(new Elixir.Notification('SVG sprites compiled!'));
    })
    .watch(paths.src.path)
    .ignore(paths.output.path);
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|array} src
 * @param  {string|null}  output
 * @return {object}
 */
var prepGulpPaths = function(src, output) {
    return new Elixir.GulpPaths()
        .src('/**/*.svg', src || config.get('assets.svg.folder'))
        .output(output || config.get('public.svg.outputFolder'));
};