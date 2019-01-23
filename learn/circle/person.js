export default class Person {

	
	constructor(str){
		this.name = str || `jun`
		console.log('str..........');

	}
	
	sayName(){
		console.log(`my name is ${this.name}`);
	}
}