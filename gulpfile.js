let gulp            = require("gulp");
let glob            = require("glob");
let path            = require('path');
let git             = require('gulp-git');
let gutil           = require('gulp-util');
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
let config = {
	path: {
		dist: 'dist',
		src:'src',
		images: '',
		script: '',
		html: '',
		css:''
	}
};

gulp.task('bump',function(cb) {

	console.log("argv:", argv.type);

	gulp.src(['./package.json', './bower.json'])
	// bump package.json and bowser.json version
		.pipe(bump({
			type: argv.type || 'patch'
		}))
		// save the bumped files into filesystem
		.pipe(gulp.dest('./'));
		cb()
});


gulp.task('push',function(cb) {
	gulp.src(['./package.json', './bower.json'])

		// commit the changed files
		// .pipe(git.add()) TODO add
		.pipe(git.commit('bump version'))

		// filter one file
		.pipe(filter('package.json'))

		// create tag based on the filtered file
		.pipe(tag())
		// push changes into repository
		.pipe(push({
			repository: 'origin',
			refspec: 'HEAD'
		}))
		.on('end', function () {
				console.log(chalk.bgBlue('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  release done  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'));
		});
	cb()
});

gulp.task('release', gulpSequence('bump', 'push'));



//默认development环境
let knowOptions = {
	string: 'env',
	default: {
		env: process.env.NODE_ENV || 'development'
	}
};

let options = minimist(process.argv.slice(2), knowOptions);



gulp.task('clean',function (cb) {
	// del.bind(null, [config.path.dist]);
	cb()
});

gulp.task('build', ['clean'], function(cb){
	console.log('文件构建中...');
	gulpSequence(cb);
});

