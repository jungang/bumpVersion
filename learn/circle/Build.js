

class Build{

	constructor(args){
		this.jsonCircles    = args.jsonCircles;
		this.width          = args.width;
		this.height         = args.height
	}

	generate(){
		let svgContainer = d3.select("body").append("svg")
			.attr("width",this.width)
			.attr("height",this.height);
		let circles =svgContainer.selectAll("circle")
			.data(this.jsonCircles)
			.enter()
			.append("circle");
		circles
			.attr("cx",function(d){return d.x_axis;})
			.attr("cy",function(d){return d.y_axis;})
			.attr("r",function(d){return 1;})
	}


}

export default Build
export let a = 1;
export let b = 2;
export let fun = f;


function f() {
	console.log('fun....');

}