"use strict";
/**
 * Created by jg on 2018/11/6.
 * aaaaaaaaaaaaaaaaaaaaaaaaaaaa
 */


exports.done = false;

let b = require('./b');

console.log('在a.js之中,b.done= %j', b.done);

exports.done = true;

console.log('a.js 执行完毕');
