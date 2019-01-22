"use strict";
/**
 * Created by jg on 2019.1.21.0021.
 */


$(function () {

	let buildDom = () =>{

		let dom = '';
		let li = '';
		let n = 100;
		for(let i=0; i <= 100; i++){
			dom+= '<li></li>'
		}
		$('#app').append($(`<ul>${dom}</ul>`))
	}



	let init = ()=>{
		buildDom()
	}

	init();


})