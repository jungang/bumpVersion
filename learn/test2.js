"use strict";
/**
 * Created by jg on 2018/12/18.
 */


function fnA(n,callback) {
	console.log('fnA().......');
	return fnB(callback)
}


function fnB(callback) {

	console.log('fnB().......');
	return cb(callback)
}


function cb(callback) {

	console.log('cb().......');
	return callback();
}



fnA(4,function () {
	console.log('start ....');
});