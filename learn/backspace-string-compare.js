"use strict";
/**
 * Created by jg on 2018/8/8.
 */


/**
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
let backspaceCompare = function(S, T) {

	let str_S = S.split('');
	let str_T = T.split('');
	let arr_S = [];
	let arr_T = [];

	str_S.forEach(function (item, index) {

		if(item === '#'){
			arr_S.pop()
		}else {
			arr_S.push(item)
		}
	});
	str_T.forEach(function (item, index) {
		if(item === '#'){
			arr_T.pop()
		}else {
			arr_T.push(item)
		}
	});

	console.log(arr_S);
	console.log(arr_T);
	
	return arr_T.join('') == arr_S.join('')
};


console.log(backspaceCompare("ab#c","ad#c"));
