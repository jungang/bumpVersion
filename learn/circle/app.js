"use strict";
/**
 * Created by jg on 2019.1.21.0021.
 */


import Build        from "./Build.js"
import Calculate    from "./calculateClass.js"

$(function () {

	let args = {
		width:700,
		height:700,
		r:1
	};

	args.jsonCircles = new Calculate(100).cal()
	new Build(args).generate();

})