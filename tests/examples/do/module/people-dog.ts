class People {

	constructor(public fullname: string) { }

	eat(food: string, time: Date) {
		console.log(`people ${this.fullname} eat ${food},at ${time.toLocaleTimeString()}`);
	}
}

class Dog {
	bark(a: string, b: boolean) { }
}

module.exports = {
	People, Dog,
}