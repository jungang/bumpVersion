"use strict";
/**
 * Created by jg on 2019.1.21.0021.
 */

import Person from "./person.js"
import Build,{b,fun} from "./Build.js"

$(function () {


	let build = new Build()
	build.build();

	console.log(b);
	console.log(fun);
	fun()





/*	let p1 = new Person()
	console.log(p1);
	
	p1.sayName()
	let p2 = new Person(`jungang`)
	p2.sayName()*/
})