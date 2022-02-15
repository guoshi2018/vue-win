/**
 * 
 * @param a 简单的加法函数的jest测试
 * @param b 
 * @returns 
 */
const sum = (a: number, b: number): number => {
	return a + b;
};

function compileAndroidCode() {
	throw new Error('you are using the wrong JDK');
}


function fetchData(callback: (v: unknown) => void) {
	setTimeout(() => {
		console.log('time is over ,now return data.');
		//	throw Error('oh');
		callback('hello,I am fine!');
	}, 1000);
}


function fetchDataUsingPromise() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const d = Date.now();
			console.log(d);
			if (d % 2 == 0) {
				resolve(`${d} is even, as resolve`);
			} else {
				reject(`${d} is odd, as reject.`);
			}
		}, 1200);
	});
}




export {
	sum,
	compileAndroidCode,
	fetchData,
	fetchDataUsingPromise,
}