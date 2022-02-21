import axios from 'axios';
//import Users from '../data/users.json';

const couple = [
	{
		desc: 'mock函数基本概念',
		func: () => {
			function myForEach(items: any, callback: Function) {
				for (let index = 0; index < items.length; index++) {
					callback(items[index]);
				}
			}

			const mockCallback = jest.fn(x => 42 + x); //jest.fn作用就是将普通函数变为mock函数
			//const mockCallback = (x:number) => 42 + x;	//这个就不能用来测试,因为它不mock
			myForEach([15, 13], mockCallback);

			//所有的 mock 函数都有这个特殊的 .mock属性，
			//它保存了关于此函数如何被调用、调用时的返回值的信息
			console.log(mockCallback);
			console.log(mockCallback.mock);
			console.log(mockCallback.mockName);
			console.log(mockCallback.mock.calls);

			// 此 mock 函数被调用了两次
			expect(mockCallback.mock.calls.length).toBe(2);

			// 第一次调用函数时的第一个参数是 15
			expect(mockCallback.mock.calls[0][0]).toBe(15);

			// 第二次调用函数时的第一个参数是 13
			expect(mockCallback.mock.calls[1][0]).toBe(13);

			// 第一次函数调用的返回值是 57
			expect(mockCallback.mock.results[0].value).toBe(42 + 15);
		},
	}, {
		desc: '利用mock属性追踪每次调用时的this值',
		func: () => {
			const myMock = jest.fn();

			const a = new myMock();
			const b = {};
			const bound = myMock.bind(b);
			bound();

			console.log(myMock.mock.instances);	// > [ <a>, <b> ]

		},
	}, {
		desc: 'Mock 函数也可以用于在测试期间将测试值注入代码︰',
		func: () => {
			const myMock = jest.fn();
			console.log(myMock());
			// > undefined

			myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);

			console.log(myMock(), myMock(), myMock(), myMock());
			// > 10, 'x', true, true
		}
	}, {
		desc: "被调用之前，将值直接注入到测试中。",
		func: () => {
			const filterTestFn = jest.fn();
			filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);
			const result = [11, 12].filter(num => filterTestFn(num));
			console.log(result);	//[11]
			console.log(filterTestFn.mock.calls[0][0]); //11
			console.log(filterTestFn.mock.calls[1][0]);
		}
	}, {
		desc: "模拟模块:用 jest.mock(...) 函数自动模拟 axios 模块。编译没通过",
		func: async () => {
			class Users {
				static all() {
					//axios.get的参数url路径不对
					return axios.get('../data/users.json').then(resp => resp.data);
				}
			}

			//现在，为测试all方法而不实际调用 API (使测试缓慢与脆弱)，
			//我们可以用 jest.mock(...) 函数自动模拟 axios 模块。
			// jest.mock('axios');
			// const users = [{ name: 'Bob' }, { name: 'Ami' }];
			// const resp = { data: users };
			// axios.get.mockResolvedValue(resp);
			//https://jestjs.io/zh-Hans/docs/mock-functions 没通过.

		}
	}, {
		desc: "在某些情况下用Mock函数替换指定返回值是非常有用的。 可以用 jest.fn" +
			"或 mockImplementationOnce方法来实现Mock函数。",
		func: () => {
			const myMockFn = jest.fn(cb => cb(null, true));
			myMockFn((err: any, val: any) => console.log(val));  // > true

			const foo = jest.fn()
				.mockImplementationOnce(cb => cb(null, true))
				.mockImplementationOnce(cb => cb(null, false));
			foo((err: any, val: any) => console.log(val));		//> true
			foo((err: any, val: any) => console.log(val));		//> false]
		}
	}, {
		desc: "当 mockImplementationOne定义的实现逐个调用完毕时， 如果定义了jest.fn ，它将使用 jest.fn ",
		func: () => {
			const mockfn = jest
				.fn(() => 'default')
				.mockImplementationOnce(() => 'first call')
				.mockImplementationOnce(() => 'second call');
			console.log(mockfn(), mockfn(), mockfn(), mockfn());
		}
	}, {
		desc: "如果你希望创建的函数支持链式调用（因为返回了this），可以使用.mockReturnThis() 函数来支持。",
		func: () => {
			const myObj1 = {
				myMethod: jest.fn().mockReturnThis(),
			};
			//is the same as 
			// const myObj2 = {
			// 	myMethod: jest.fn(function () {
			// 		return this;
			// 	})
			// };
		}
	}

];

export default () => {
	for (let i = couple.length - 1; i < couple.length; i++) {
		test(couple[i].desc, couple[i].func);
	}
};
