
const firstFunc = function () {
	return 'result from real firstFunc of mocked-bar-commonJS.ts';
}

const secondFunc = function () {
	return 'result from real secondFunc of mocked-bar-commonJS.ts';
}


module.exports = {
	firstFunc,
	secondFunc,
}