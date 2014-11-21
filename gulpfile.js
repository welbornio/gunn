var gulp = require('gulp'),
		concat = require ('gulp-concat'),
		less = require('gulp-less'),
		html2js = require('gulp-ng-html2js'),
		karma = require('karma').server;


var appHtml = [
	'src/**/*.html'
];

var appLess = [
	'src/app.less',
	'src/components/**/*.less'
];

var appJs = [
    'node_modules/socket.io-client/socket.io.js',
    'node_modules/angular/angular.js',
    'node_modules/angular-ui-router/release/angular-ui-router.js',
	'src/app.js',
	'src/components/**/*.js',
    'src/tools/**/*.js',
	'!src/components/**/*.spec.js'
];

var appWatch = [
	appHtml,
	appLess,
	appJs
];

gulp.task('templatize', function() {
	return gulp.src(appHtml)
		.pipe(html2js({
			moduleName: function moduleName(file) {
				var path = file.path.split('/'),
				folder = path[path.length - 2];
				return 'app.' + folder.replace(/-[a-z]/g, function (match) {
					return match.substr(1).toUpperCase();
				});
			}, prefix: '/src/'
		}))
		.pipe(concat('templates.js'))
		.pipe(gulp.dest('build'));
});

gulp.task('less', function() {
	return gulp.src(appLess)
		.pipe(less())
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest('build'));
});

gulp.task('js', function() {
	return gulp.src(appJs)
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('build'));
});

gulp.task('move', function() {
	return gulp.src('src/index.html')
		.pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
	gulp.watch(appWatch, ['tasks']);
});

gulp.task('tasks', ['move', 'js', 'templatize', 'less']);

gulp.task('default', ['tasks', 'watch'])
