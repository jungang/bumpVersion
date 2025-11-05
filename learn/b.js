"use strict";
/**
 * Created by jg on 2018/11/6.
 */


exports.done = false;

let a = require('./a');

console.log('在b.js之中,a.done = %j', a.done);

exports.done = true;




console.log('b.js 执行完毕');
