class Calculate {

	constructor(r){

		this.r = r;  //半径
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
		while (this.b < this.r) {
			let EdgeA = this.getEdgeA(this.b);

			this.arr_a.push(EdgeA);
			let EdgeB = [...EdgeA].reverse();
			this.arr_b.push(EdgeB);

			this.b = this.b + 1
		}


		/*
		    axis_00 |   axis_10
			 -a, b  |   a , -b
		b -----------------------
			 -a ,b	|   a , b
		    axis_01 |   axis_11
		 a
		 */


		let axis_11 = this.arr_a
			.concat(this.arr_b)
			.sort()
			.filter(
				(element,index,self) => JSON.stringify(self[index-1]) !== JSON.stringify(self[index])
			)

		let axis_10 = axis_11.map((item,index) => [item[0],     -item[1]])
		let axis_00 = axis_11.map((item,index) => [-item[0],    -item[1]])
		let axis_01 = axis_11.map((item,index) => [-item[0],    item[1]])

		let axis = axis_11.concat(axis_10).concat(axis_00).concat(axis_01)
		console.log(axis);



		return axis
	}



}

export default Calculate
