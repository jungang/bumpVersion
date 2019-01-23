"use strict";
/**
 * Created by jg on 2019.1.21.0021.
 */


import Build from "./Build.js"
import Calculate from "./calculateClass.js"

$(function () {

	let args = {
		jsonCircles:[
			{"x_axis":30,"y_axis":30,"radius":20,"color":"greeen"},
			{"x_axis":70,"y_axis":70,"radius":20,"color":"purple"},
			{"x_axis":110,"y_axis":100,"radius":20,"color":"red"}
		],
		width:500,
		height:500
	};


	let build = new Build(args);
	build.generate();

	let c = new Calculate();
	c.cal()








/*	let p1 = new Person()
	console.log(p1);
	
	p1.sayName()
	let p2 = new Person(`jungang`)
	p2.sayName()*/
})