import { firstFunc, secondFunc, complexFunc } from './mocked-bar-es6';


function callSecondFun() {
	console.log('in bar-call.ts, calling secondFun:', secondFunc());
}

function callComplexFun(n: string, a: number, i: boolean) {
	console.log('in bar-call.ts, calling complexFunc:', complexFunc(n, a, i));
}



export {
	callSecondFun,
}