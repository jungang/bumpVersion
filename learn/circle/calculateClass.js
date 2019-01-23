class Calculate {


	constructor(){

		this.r = 5;  //半径
		this.a = 0;  // a边
		this.b = 0;  // b边
		this.arr_a = [];
		this.arr_b = []
	}


	getEdgeA(edge_b){
		let edge_a = (this.r * this.r - edge_b * edge_b) ** 0.5;
		let a1 = Math.ceil(edge_a);
		let a2 = Math.floor(edge_a);
		let as_1 = Math.abs(a1 * a1 + edge_b * edge_b - this.r * this.r);
		let as_2 = Math.abs(a2 * a2 + edge_b * edge_b - this.r * this.r);
		return (as_1 < as_2)? [a1, edge_b]:[a2, edge_b]
	}

	cal(){
		while (this.b <= this.r){
			let EdgeA = this.getEdgeA(this.b);
			this.arr_a.push(EdgeA);
			// let EdgeB = EdgeA.reverse();
			let EdgeB = [...EdgeA].reverse();
			this.arr_b.push(EdgeB);
			this.b = this.b + 1
		}

		console.log('arr_a:', this.arr_a)
		console.log('arr_b:', this.arr_b)
		let arr = this.arr_a.concat(this.arr_b).sort()
		console.log('arr:', arr)

		let arrr = arr.filter(function(element,index,self){


			return self.indexOf(element) === index;
			});

		console.log('arrr:', arrr)


	}



}

export default Calculate
