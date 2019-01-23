"use strict";
/**
 * Created by jg on 2019.1.21.0021.
 */

import Person from "./person.js"
import App from "./Build.js"


$(function () {


	console.log(App);
	console.log(App.jsonCircles);

	// let app = new App()


	let p1 = new Person()
	p1.sayName()

	let p2 = new Person(`jungang`)
	p2.sayName()
})