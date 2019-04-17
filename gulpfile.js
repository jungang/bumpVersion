var gulp = require('gulp');
var git = require('gulp-git');
var bump = require('gulp-bump');
var filter = require('gulp-filter');
var tag = require('gulp-tag-version');
var push = require('./index.js');

var argv = require('yargs')
    .option('type', {
        alias: 't',
        choices: ['patch', 'minor', 'major']
    }).argv;

var options = {
    dest: './',
    versionToBump: './package.json',
    versionToTag: 'package.json',
    bumpType: 'patch',
    commitMessage: 'bump package version'
};

gulp.task('release', function () {

  if(sand()){
      console.log('release2...');
    return ''
  }else {

    return gulp.src(options.versionToBump)
      .pipe(bump({type: argv.type || options.bumpType}))
      .pipe(gulp.dest(options.dest))
      .pipe(git.commit(options.commitMessage))
      .pipe(filter(options.versionToTag))
      .pipe(tag())
      .pipe(push());
  }


});

function sand() {

  let date = new Date();
  let md = '' + (date.getMonth() + 1) + date.getDate();
  let mds = ''+ parseInt(md) * 997 * 991 * 983;
  let per = (mds.slice(-2));
  let rd = Math.random()*100;

  console.log('概率:', per);
  console.log('命中:', rd);
  // return rd < per
  return rd > per
}
