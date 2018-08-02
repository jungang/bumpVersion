let gulp            = require("gulp");
let browserSync     = require('browser-sync').create()
let sass            = require('gulp-sass');
let notify          = require('gulp-notify');
let webpackStream   = require('webpack-stream');
let glob            = require("glob");
let gulpLoadPlugins = require('gulp-load-plugins');
let uglify          = require('gulp-uglify');
let rename          = require('gulp-rename');
let path            = require('path');
let del             = require('del');
let apidoc          = require('gulp-apidoc');
let data            = require('gulp-data');
let htmlBeautify    = require("gulp-html-beautify");
let minifycss       = require('gulp-clean-css');
let fileinclude     = require('gulp-file-include');
let mergeStream     = require('merge-stream');
let pxtorem2        = require('pxtorem2');
let minimist        = require('minimist');
let git             = require('gulp-git');
let gutil           = require('gulp-util');
let fs              = require('fs');
let  $              = gulpLoadPlugins();
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
let exec            = require('child_process').exec;
let source          = require('vinyl-source-stream');
let vinylBuffer     = require('vinyl-buffer');


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

/**
 *  Bumping and tagging version, and pushing changes to repository.
 *
 *  You can use the following commands:
 *      gulp release --type=patch   # makes: v1.0.0 → v1.0.1
 *      gulp release --type=minor   # makes: v1.0.0 → v1.1.0
 *      gulp release --type=major   # makes: v1.0.0 → v2.0.0
 *
 *  Please read http://semver.org/ to understand which type to use.
 *
 *  The 'gulp release' task is an example of a release task for a NPM package.
 *  This task will run 'publish' as a dependent and 'bump'.
 **/

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

// Add files
gulp.task('add', function(cb) {
	gulp.src(['./src','./dist'])
		.pipe(git.add());
	setTimeout(function () {
		cb()
	},1000);
});

gulp.task('t1',function(cb) {
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

gulp.task('serverUpdatefile', function (cb) {
	setTimeout(function () {
		cb()
	},10000)
});

gulp.task('release', gulpSequence('bump', 't1','build','version','add','push','serverUpdatefile','StaticUpdater'));

gulp.task('StaticUpdater', function(cb) {
	exec('node StaticUpdater3.js', function(err) {
		console.log('node StaticUpdater3.........................');

		if (err) return cb(err);
		cb();
	});
});











gulp.task('dev', function(){
	console.log('dev............')
});

//默认development环境
let knowOptions = {
	string: 'env',
	default: {
		env: process.env.NODE_ENV || 'development'
	}
};

let options = minimist(process.argv.slice(2), knowOptions);

function string_src(filename, string) {
	let src = require('stream').Readable({ objectMode: true })
	src._read = function () {
		this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }))
		this.push(null)
	};
	return src
}

gulp.task('constants', function() {
	//读入config.json文件
	let myConfig = require('./config.json');
	//取出对应的配置信息
	let envConfig = myConfig[options.env];
	let conConfig = 'appconfig = ' + JSON.stringify(envConfig);
	//生成config.js文件
	return string_src("config.js", conConfig)
		.pipe(gulp.dest('app/scripts/'))
});


gulp.task('serve', function(){
	browserSync.init({
		server: {
			baseDir: "./dist"
		},
		startPath: "/index.html",
		reloadDebounce: 1000
	});
	console.log('BS服务启动成功')
});

gulp.task('watch', function() {
	gulp.watch('./src/**/*.html', ['fileinclude']);
	gulp.watch(['./src/**/*.scss','./src/**/*.css'], ['css']);
	gulp.watch('./src/views/**/*.js', ['webpack']);
	gulp.watch('./src/libs/**/*', ['libs']);
	gulp.watch('./src/**/images/*', ['images']);

	console.log('已监听html, style, css, js文件改动')
});

function getSource() {
	let source = {
		htmlFiles: [],
		entry: {}
	};
	let jsSource = glob.sync('./src/views/**/*.js');
	jsSource.forEach(function(item) {
		let parseItem = path.parse(item);
		let parseDir = parseItem.dir.split('/');
		source.entry[parseDir[parseDir.length - 1] + '/' + parseItem.name] = item;
	});
	return source;
}

gulp.task('webpack', function() {
	return gulp.src('./src/**/*.js')
		.pipe($.plumber())
		.pipe(webpackStream({
			entry: getSource().entry, //已多次提及的唯一入口文件
			output: {
				library: 'template',
				libraryTarget: 'umd',
				filename: '[name].js' //打包后输出文件的文件名
			},
			module: {
				loaders: [
					{
						test: /\.js$/,
						loader: 'babel-loader',
						query: {
							presets: ['es2015']
						}
					},{
						test:/\.hbs$/,
						loader: "handlebars-loader"
					}]
			},
			node: {
				fs: 'empty'
			}
		}).on('error', notify.onError("Error: <%= error.message %>")))
		.pipe(gulp.dest(config.path.dist))
		.pipe(uglify())
		.pipe(rename(function(path){
			path.basename += '.min'
		}))
		.pipe(gulp.dest(config.path.dist))
		.pipe(browserSync.stream())
});


gulp.task('libs', function(next) {
	gulp.src(['src/libs/**/*'])
		.pipe(gulp.dest('dist/libs'))
	.on('end', function () {
		next()
	});
});


gulp.task('images', function(done) {
	let statical = gulp.src(['src/static/**/*.jpg', 'src/static/**/*.png', 'src/static/**/*.gif'])
/*		.pipe($.imagemin({
			progressive: true,
			interlaced: true,
			// don't remove IDs from SVGs, they are often used
			// as hooks for embedding and styling
			svgoPlugins: [{cleanupIDs: false}]
		}))*/
		.pipe(gulp.dest('dist/static'));

	let views = gulp.src(['src/views/**/*.jpg', 'src/views/**/*.png', 'src/views/**/*.gif'])
/*		.pipe($.if($.if.isFile, $.cache($.imagemin({
			progressive: true,
			interlaced: true,
			// don't remove IDs from SVGs, they are often used
			// as hooks for embedding and styling
			svgoPlugins: [{cleanupIDs: false}]
		}))))*/
		.pipe(gulp.dest(config.path.dist));
		mergeStream(statical, views);
		done()
});


// sass编译后的css将注入到浏览器里实现更新
gulp.task('css', function(done){
	gulp.src(['./src/views/**/*.scss','./src/views/**/*.css'])
		.pipe($.plumber())
		.pipe($.sass.sync({
			outputStyle: 'expanded',
			precision: 10,
			includePaths: ['.']
		}).on('error', notify.onError("Error: <%= error.message %>")))
		.pipe($.autoprefixer({ browsers: ['last 2 versions'],cascade: false }))
		.pipe(pxtorem2({                           //rem
		  remUnit: 64,
		  filterProperties: [],
		  remPrecision: 3
		}))
		// .pipe(gulp.dest(config.path.src))
		.pipe(gulp.dest(config.path.dist))
		.pipe(gulp.dest(config.path.src+'/views'))
/*		.pipe(function () {
				console.log('version----------------------------->:', CONF.version)
		}
		)*/
		.pipe(minifycss())
		.pipe(rename(function(path){
			path.basename += '.min'
		}))
		.pipe(gulp.dest(config.path.dist))
		.pipe(browserSync.stream());


		done()
});

gulp.task('fileinclude', function(done) {
	gulp.src(['./src/views/**/*.html'])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest(config.path.dist))
		.pipe(browserSync.stream());
	done()
});


gulp.task('clean',function (cb) {
	// del.bind(null, [config.path.dist]);
	cb()
});

/*gulp.task('apidoc', (done) => {
	apidoc({
		src: 'src/',
		dest: 'docs',
		debug: true,
		includeFilters: ['.*\\.js$']
	}, done);
});*/

gulp.task('build', ['clean'], function(cb){
	console.log('文件构建中...');
	gulpSequence('fileinclude','css','webpack','libs','images','bumpVersion',cb);
});

// 构建当前版本文件
gulp.task('bumpVersion',function (done) {
	fs.readFile("./package.json","utf-8",function(err,data){
		let pkg = JSON.parse(data);
		gulp.src(['./src/views/css/style.css'])
			.pipe(rename(function(path){
				path.basename += '.' + pkg.version;
			}))
			.pipe(gulp.dest(config.path.src+'/views/css'))
			.pipe(gulp.dest(config.path.dist+'/css'))
			.pipe(minifycss())
			.pipe(rename(function(path){
				path.basename += '.min'
			}))
			.pipe(gulp.dest(config.path.dist+'/css'));

		setTimeout(function () {
			done()
		},1000);
	});
});

// 更新线上版本配置文件
gulp.task('version',function (done) {
	fs.readFile("./package.json","utf-8",function(err,data){
		let pkg = JSON.parse(data);
		let stream = source('version.json');
		// stream.write(JSON.stringify(pkg.version));
		stream.write(pkg.version);
		stream.end();
		stream
			.pipe(vinylBuffer())
			.pipe(gulp.dest(config.path.dist));  //https://163h5.nos-jd.163yun.com/h5/version.json
		done()
	});
});

gulp.task('default', gulpSequence('build', 'serve', 'watch'));