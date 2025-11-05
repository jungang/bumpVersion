"use strict";
/**
 * Created by jg on 4/17/2019.
 */

var fs = require('fs');

var readFile = function (fileName){
	return new Promise(function (resolve, reject){
		setTimeout(function () {
			resolve(fileName);
		},1000)
	});
};
console.log('readFile');
var gen = function* (){
	console.log('gen');

	var f1 = yield readFile('./a.js');
	console.log(f1);

	var f2 = yield readFile('./b.js');
	console.log(f2);
	console.log(f1.toString());
	console.log(f2.toString());
};

gen()
