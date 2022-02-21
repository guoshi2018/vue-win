
//测试异步代码
import { fetchData, fetchDataUsingPromise } from "target-ts/fun";

/**
 * 同步语法测试,expect不会被调用
 */
const demo1 = () => {
	function cb(data: any) {
		expect(data).toContain('hello');	//不会执行
		console.log('您不会看到,即使超时时限为0...');
	}
	fetchData(cb);
};

/**
 * 可以使用单个参数调用 done，而不是将测试放在一个空参数的函数。
 * Jest会等done回调函数执行结束后，结束测试。
 * @param done 
 */
const demo2 = (done: Function) => {
	function cb(data: any) {
		try {
			expect(data).toContain('hello');
			done();
		} catch (error) {
			//console.log('error:', error);
			done(error);
		}
	}
	fetchData(cb);
}

/**
 * 如果你使用Promise，则测试异步代码有一种更简单的方案。
 * 为你的测试返回一个Promise，则Jest会等待Promise的resove状态或reject状态
 * @returns 
 */
const demo3 = () => {
	return fetchDataUsingPromise()
		.then((data: any) => {
			expect(data).toContain('even');
			console.info('receive even.');
		})
		.catch((err: any) => {
			expect(err).toContain("odd");
			console.info('receive odd');
		});
};

/**
 * 但是上面的例子,即使被catch,测试用例也不会失败.因为Promise是fulfilled状态.
 * 确保添加expect.assertions即可让其归为失败行列
 * @returns 
 */
const demo4 = () => {
	expect.assertions(1);
	return fetchDataUsingPromise()
		.catch((err: any) => {
			expect(err).toContain("odd");
			console.info('receive  odd');
		});
}

/**
 * 还可以使用 .resolves 匹配器在您期望的声明，Jest
 * 会等待这一 Promise 来解决。 如果 Promise 被拒绝，则测试将自动失败。
 * @returns 
 */
const demo5 = () => {
	return expect(fetchDataUsingPromise()).resolves.toContain('even');
};

/**
 * 与demo5,反之亦然
 * @returns 
 */
const demo6 = () => {
	return expect(fetchDataUsingPromise()).rejects.toContain('odd');
};

/**
 * 可以在测试中使用 async 和 await。 写异步测试用例时，
 * 可以在传递给test的函数前面加上async。
 */
const demo7 = async () => {
	const data = await fetchDataUsingPromise();
	expect(data).toContain('even');
	expect(data).toContain('');
};

export default () => {
	test('异步代码测试,失败不奇怪',
		//demo1,		//没有失败,不能说明问题,因为expect语句没有机会执行
		//demo2,
		//demo3,
		//demo4,
		//demo5,
		//demo6,
		demo7,
	);
};

/*
Conclusion#
Vue updates the DOM asynchronously; tests runner executes code synchronously instead.
Use await nextTick() to ensure the DOM has updated before the test continues.

Functions that might update the DOM (like trigger and setValue) return nextTick, 
so you need to await them.

Use flushPromises from Vue Test Utils to resolve any unresolved promises from 
non-Vue dependencies (such as API requests).

Use Suspense to test components with an asynchronous setup.
*/
