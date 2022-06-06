
const firstFunc = function () {
	return 'result from real firstFunc of mocked-bar-es6.ts';
}

const secondFunc = function () {
	return 'result from real secondFunc of mocked-bar-es6.ts';
}

const complexFunc = function (name: string, age: number, isVip: boolean) {
	return `result from real complexFunc: name:<${name}>,age:<${age}>,isVip:<${isVip}>`;
}


export {
	firstFunc,
	secondFunc,
	complexFunc,
}