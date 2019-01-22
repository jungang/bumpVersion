export default class Build {

	let init = ()=> {

		let buildDom = () =>{

			let dom = '';
			let li = '';
			let n = 100;
			for(let i=0; i <= n; i++){
				dom+= `<li>${i}</li>`
			}
			$('#app').append($(`<ul>${dom}</ul>`))
		}



		let init = ()=>{
			// buildDom() 
		}

		init();

		var jsonCircles = [
			{"x_axis":30,"y_axis":30,"radius":20,"color":"greeen"},
			{"x_axis":70,"y_axis":70,"radius":20,"color":"purple"},
			{"x_axis":110,"y_axis":100,"radius":20,"color":"red"}
		];

		var svgContainer = d3.select("body").append("svg")
			.attr("width",500)
			.attr("height",500);

		var circles =svgContainer.selectAll("circle")
			.data(jsonCircles)
			.enter()
			.append("circle");

		circles
			.attr("cx",function(d){return d.x_axis;})
			.attr("cy",function(d){return d.y_axis;})
			.attr("r",function(d){return d.radius;})
			.style("fill",function(d){return d.color;});


		let p1 = new Person()
		p1.sayName()

		let p2 = new Person(`jungang`)
		p2.sayName()
	}
}