export default class Person {

	
	constructor(str){
		this.name = str || `jun`
	}
	
	sayName(){
		console.log(`my name is ${this.name}`);
		
	}
}