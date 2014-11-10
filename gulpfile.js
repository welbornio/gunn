var gulp = require('gulp'),
		concat = require ('gulp-concat'),
		less = require('gulp-less'),
		html2js = require('gulp-ng-html2js'),
		karma = require('karma').server;


var wodHtml = [
	'src/components/**/*.html'
];

var wodLess = [
	'src/wod.less',
	'src/components/**/*.less'
];

var wodJs = [
	'src/wod.js',
	'src/components/**/*.js',
	'!src/components/**/*.spec.js'
];

var wodWatch = [
	wodHtml,
	wodLess,
	wodJs
];

gulp.task('templatize', function() {
	return gulp.src(wodHtml)
		.pipe(html2js({
			moduleName: function moduleName(file) {
				var path = file.path.split('/'),
				folder = path[path.length - 2];
				return 'wod.' + folder.replace(/-[a-z]/g, function (match) {
					return match.substr(1).toUpperCase();
				});
			}, prefix: '/src/components/'
		}))
		.pipe(concat('templates.js'))
		.pipe(gulp.dest('build'));
});

gulp.task('less', function() {
	return gulp.src(wodLess)
		.pipe(less())
		.pipe(concat('app.css'))
		.pipe(gulp.dest('build'));
});

gulp.task('js', function() {
	return gulp.src(wodJs)
		.pipe(concat('app.js'))
		.pipe(gulp.dest('build'));
});

gulp.task('move', function() {
	return gulp.src('src/index.html')
		.pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
	gulp.watch(wodWatch, ['tasks']);
});

gulp.task('tasks', ['move', 'js', 'templatize', 'less']);

gulp.task('default', ['tasks', 'watch'])
