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

	d3.select("body").style("background-color", "black");  // 直接选择 ->并设置属性
	d3.selectAll("p").style("color", function() { // 选择 -> 动态设置属性
		return "hsl(" + Math.random() * 360 + ",100%,50%)";
	});
	d3.selectAll("p") // 选择 -> 绑定数据 -> 动态设置属性
		.data([4, 8, 15, 16, 23, 42])
		.style("font-size", function(d) { return d + "px"; });




})