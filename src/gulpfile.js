var gulp = require('gulp'),
		concat = require ('gulp-concat'),
		less = require('gulp-less'),
		html2js = require('gulp-ng-html-2js'),
		karma = require('karma').server;


var html = [
	'/src/components/**/*.html'
];


gulp.task('templatize', function() {
	return gulp.src(html)
		.pipe(html2js({
			moduleName: function (file) {
				var path = file.path.split('/'),
				folder = path[path.length - 2];
				return 'needle.' + folder.replace(/-[a-z]/g, function (match) {
					return match.substr(1).toUpperCase();
				});
			}, prefix: '/src/components/'
		}))
		.pipe(concat('lounge.templates.js'))
		.pipe(gulp.dest('build'));
});

gulp.task('default', ['templatize']);

