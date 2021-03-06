"use strict";
/**
 * Created by jg on 2019-07-22.
 */


class Observer {
	constructor(data) {
		// your code
	}

	$on() {
		// your code
	}
	$emit() {
		// your code
	}
}

const w = new Observer({a: 1});
w.$on('a', (v) => {
	console.log('first ', v)
})

w.$on('a', (v) => {
	console.log('second ', v)
})

w.a = 2; // console: first 2  second 2

w.$emit('a', 3); // console: first 3  second 3

w.a === 3; // true


//////////////////////////
// 4. 请说出以下代码打印的结果
async function async1() {
	console.log('async1 start');
	await async2();
	console.log('async1 end');
}

async function async2() {
	console.log('async2');
}

console.log('script start');

setTimeout(function() {
	console.log('setTimeout');
}, 0);

async1();

new Promise(function(resolve) {
	console.log('promise1');
	resolve();
}).then(function() {
	console.log('promise2');
});

console.log('script end');
