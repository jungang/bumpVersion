

class Build{

	constructor(args){
		this.jsonCircles    = args.jsonCircles;
		this.width          = args.width;
		this.height         = args.height
		this.r              = args.r
	}

	generate(){
		let svgContainer = d3.select("body").append("svg")
			.attr("width",this.width)
			.attr("height",this.height);
		let circles =svgContainer.selectAll("circle")
			.data(this.jsonCircles)
			.enter()
			.append("circle");

		let w = this.width/2;
		let h = this.height/2;

		circles
			.attr("cx",function(d){return d[0] + w ;})
			.attr("cy",function(d){return d[1] + h ;})
			.attr("r",this.r)
	}


}

export default Build
export let a = 1;
export let b = 2;
export let fun = f;


function f() {
	console.log('fun....');

}