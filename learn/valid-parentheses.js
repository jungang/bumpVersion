"use strict";
/**
 * Created by jg on 2018/8/8.
 */


/**
 * @param {string} s
 * @return {boolean}
 */
let isValid = function(s) {

	console.log('s:', s);

	let arr         = s.split('');
	let strLeft     = '{[(';
	let strRight    = '}])';
	let stackLeft   = [];
	let err         = false;
	arr.forEach(function (item, index) {

		if(strLeft.indexOf(item) !== -1){           //如果是左侧符号
			stackLeft.push(item)                    //将该符号压入左侧栈
		}else {

			if(stackLeft.length ===0){
				err = true;
			}

			let leftIndex = strRight.indexOf(item);     //换算对应左侧符号索引位置

			// strLeft[leftIndex]   取出符号
			// stackLeft[stackLeft.length-1]   堆栈中的顶端符号
			if(stackLeft[stackLeft.length-1] === strLeft[leftIndex]){   //判断是否对应
				stackLeft.pop()
			}else {
				err = true;
			}
		}
	});
	return (err)? !err :  !stackLeft.length
};

console.log(isValid("(])"));
// console.log(isValid("]"));
// console.log(isValid("()[]{}"));
// console.log(isValid("()"));
// console.log(isValid("([)]"));
// console.log(isValid("{[]}"));


// isValid("()");
// isValid("()[]{}");
// isValid("([)]");
// isValid("{[]}");