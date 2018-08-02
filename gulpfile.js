let gulp            = require("gulp");
let glob            = require("glob");
let path            = require('path');
let git             = require('gulp-git');
let fs              = require('fs');
let bump            = require('gulp-bump');
let push            = require('gulp-git-push');
let tag             = require('gulp-tag-version');
let argv            = require('yargs')
						.option('type', {
							alias: 't',
							choices: ['patch', 'minor', 'major']
						}).argv;
let filter          = require('gulp-filter');
let chalk           = require('chalk');
let gulpSequence    = require('gulp-sequence');
let minimist        = require('minimist');

gulp.task('bump',function(cb) {
	gulp.src(['./package.json', './bower.json'])
		.pipe(bump({
			type: argv.type || 'patch'
		}))
		.pipe(gulp.dest('./'));
		cb()
});

gulp.task('push',function(cb) {
	gulp.src(['./package.json'])
		// commit the changed files
		// .pipe(git.add()) //TODO add
		.pipe(git.commit('bump version'))

		// filter one file
		.pipe(filter('package.json'))

		// create tag based on the filtered file
		.pipe(tag())
		// push changes into repository
		.pipe(push({
			repository: 'origin',
			refspec: 'HEAD'
		}));
	cb()
});

gulp.task('release', gulpSequence('bump', 'push'));
