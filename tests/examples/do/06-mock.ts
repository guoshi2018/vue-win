import axios from 'axios';


jest.mock('do-jest-module/add');
import add from 'do-jest-module/add'; //被mock



const couple = [
	{
		desc: 'mock函数基本概念,使用匿名函数,仅一个参数,返回值也仅一个值',
		func: () => {
			function myForEach(items: any, callback: Function) {
				for (let index = 0; index < items.length; index++) {
					callback(items[index]);
				}
			}
			//jest.fn(implementation) is a shorthand for 
			//jest.fn().mockImplementation(implementation).
			const mockCallback = jest.fn(x => 42 + x); //jest.fn作用就是将普通函数变为mock函数
			//const mockCallback = (x:number) => 42 + x;	//这个就不能用来测试,因为它不mock
			myForEach([15, 13], mockCallback);

			//所有的 mock 函数都有这个特殊的 .mock属性，
			//它保存了关于此函数如何被调用、调用时的返回值的信息
			console.log(mockCallback);
			console.log(mockCallback.mock);
			console.log(mockCallback.mockName);
			console.log(mockCallback.mock.calls);

			//此 mock 函数被调用了两次
			expect(mockCallback.mock.calls.length).toBe(2);

			// 第一次调用函数时的第一个参数是 15
			expect(mockCallback.mock.calls[0][0]).toBe(15);

			// 第二次调用函数时的第一个参数是 13
			expect(mockCallback.mock.calls[1][0]).toBe(13);

			// 第一次函数调用的返回值是 57
			expect(mockCallback.mock.results[0].value).toBe(42 + 15);

			//不能用toB,toStrictEqual判断对象各字段相同;
			//expect(mockCallback.mock.results[1]).toBe({ type: 'return', value: 55 });
			//expect(mockCallback.mock.results[1]).toStrictEqual({ type: 'return', value: 55 });
			expect(mockCallback.mock.results[1]).toEqual({ type: 'return', value: 55 });
		},
	}, {
		desc: 'mock函数基本概念,使用具名函数,多个个参数,返回值为元组',
		func: () => {
			function myForEach<T>(items: T[], callback: (v: T, idx: number) => T[]) {
				for (let index = 0; index < items.length; index++) {
					callback(items[index], index);
				}
			}

			//这样,还是匿名函数
			// const cb = (item: number, idx: number) => {
			// 	return [item + idx + 100, item * (idx + 2)];
			// };
			function cb(item: number, idx: number) {
				return [item + idx + 100, item * (idx + 2)];
			};

			const mockCallback = jest.fn(cb); //jest.fn作用就是将普通函数变为mock函数
			//const mockCallback = (x:number) => 42 + x;	//这个就不能用来测试,因为它不mock
			myForEach([15, 13, 18], mockCallback);

			//所有的 mock 函数都有这个特殊的 .mock属性，
			//它保存了关于此函数如何被调用、调用时的返回值的信息
			//		console.log(mockCallback);
			console.log(mockCallback.mock);
			//但是,原函数是否具名, 并不影响mockName的匿名还是具名.默认一直都是匿名.
			console.log(mockCallback.mockName);
			console.log(mockCallback.mock.calls);

			// //此 mock 函数被调用了两次
			expect(mockCallback.mock.calls.length).toBe(3);

			// // 第一次调用函数时的第一/二个参数分别是 15 0
			expect(mockCallback.mock.calls[0][0]).toBe(15);
			expect(mockCallback.mock.calls[0][1]).toBe(0);

			// 第三次调用函数时的第一/二个参数分别是 18 2
			expect(mockCallback.mock.calls[2][0]).toBe(18);
			expect(mockCallback.mock.calls[2][1]).toBe(2);

			// 第二次函数调用的返回值是 [114,39] == [13+1+100,13*(1+2)]
			expect(mockCallback.mock.results[1].value).toEqual([114, 39]);
			//第三次函数的调用结果:
			expect(mockCallback.mock.results[2]).toEqual({
				type: 'return',
				value: [120, 72]
			});
		},
	}, {
		desc: '利用mock属性追踪每次调用时的this值',
		func: () => {
			const myMock = jest.fn();

			const a = new myMock();
			const c = new myMock();
			const b = {};
			const bound = myMock.bind(b);
			bound();

			//An array that contains all the object instances 
			//that have been instantiated from this mock function using new.
			console.log(myMock.mock.instances);	// > [ <a>,<c> <b> ]

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
		func: async () => {
			const myMockFn = jest.fn(cb => cb('hello', 'world'));
			myMockFn((err: any, val: any) => console.log(val, err));  // > world hello

			const foo = jest.fn()
				.mockImplementationOnce(cb => cb(null, true))
				.mockImplementationOnce(cb => cb(null, false));
			foo((err: any, val: any) => console.log(val));		//> true
			foo((err: any, val: any) => console.log(val));		//> false]


			const cjPath: string = 'do-jest-module/mocked-bar-commonJS';
			const realCj = require(cjPath);
			console.log('使用真实的commonjs导入,调用firstFunc:', realCj.firstFunc());

			//jest.mock被无条件提升至当前测试范围的第一句,导致上面realCj.firstFunc()返回undefinded
			//也导致,如果这里使用cjPath,将报错: cjPath is undefined.
			jest.mock('do-jest-module/mocked-bar-commonJS');
			const mockCj = require(cjPath);
			mockCj.secondFunc.mockImplementationOnce(() => 'hello,mock commonjs');
			console.log('使用mock替换导入的commonjs模块方法,则调用模拟方法:', mockCj.secondFunc());

			const es6Path = 'do-jest-module/mocked-bar-es6';
			const realEs6 = await import(es6Path);
			console.log('使用真实的es6导入,调用firstFunc:', realEs6.firstFunc());

			jest.mock('do-jest-module/mocked-bar-es6');
			const mockes6 = await import(es6Path);
			mockes6.secondFunc.mockImplementationOnce(() => 'hello,mock es6');
			console.log('使用mock替换导入的es6模块方法,则调用模拟方法:', mockes6.secondFunc());

			//模块默认导出为方法的case,略


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
	}, {
		desc: "mockImplementation can also be used to mock class constructors:",
		func: () => {
			jest.mock('do-jest-module/people-dog');
			const PD = require('do-jest-module/people-dog');
			const Dog = PD.Dog;		//infact,this is constructor
			const People = PD.People;


			//无参class测试-----------------------------------------
			//const mockBark = jest.fn();
			//const mockBark = jest.fn(() => "a value returned that is not nessary");
			const mockBark = jest.fn().mockImplementation(
				(a: string, b: boolean) => `string is ${a},boolean is ${b}`
			);
			// const mockBark = jest.fn().mockImplementationOnce(
			// 	(a: string, b: boolean) => `string is ${a},boolean is ${b}.but only first call.`
			// );
			Dog.mockImplementation(() => { //模拟类的实现
				return {
					bark: mockBark,
				}
			});
			const dog = new Dog();
			dog.bark('yes', true);
			dog.bark('no', false);
			console.log('dog bark:', mockBark.mock.calls, mockBark.mock.results);

			//有参class测试--------------------
			People.mockImplementation(() => {
				return {
					//constructor:(public fulln:string)=>{}
					eat: jest.fn(() => 'mock, 竟然签名也可以不一样'),
				}
			});
			const p = new People();
			p.eat('hey', 'pt', false, new Date());
			console.log('calls to people eat:', p.eat.mock.calls);

		},
	}, {
		desc: "mockName属性的用法:为你的Mock函数命名，该名字会替代 jest.fn() " +
			"在单元测试的错误输出中出现。",
		func: function () {
			const mockFn = jest.fn().mockName('this-is-mock-name-by-mockName-method');
			mockFn();
			//	mockFn();
			expect(mockFn).toHaveBeenCalledTimes(2);
		}
	}, {
		desc: "some Syntactic sugar function:",
		func: async () => {
			const mockFn1 = jest.fn().mockReturnThis();
			mockFn1.mockImplementation(() => "hello");
			console.log(`first call:<${mockFn1()}>,second call:<${mockFn1}>`);

			//same as :
			// const mockFn1_1 = jest.fn(function () {
			// 	return this;
			// });

			const mockFn2 = jest.fn().mockReturnValue(18);
			const mockFn3 = jest.fn(() => 100).mockReturnValueOnce(-29);
			console.log(mockFn2(), mockFn3(), mockFn3(), mockFn3());//18,-29,100,100

			//Useful to mock async functions in async tests:
			//jest.fn().mockImplementation(() => Promise.resolve(value));
			const mockFn4 = jest.fn().mockResolvedValue(98);
			const v4_1 = await mockFn4();
			const v4_2 = await mockFn4();
			console.log(v4_1, v4_2);	// 98 ; 98

			//same as jest.fn().mockImplementationOnce(() => Promise.resolve(value));
			const mockFn5 = jest.fn().mockResolvedValueOnce('hello,world');
			const v5_1 = await mockFn5();
			const v5_2 = await mockFn5();
			console.log(v5_1, v5_2); // hello,world   undefined

			//same as jest.fn().mockImplementation(() => Promise.reject(value));
			const mockFn6 = jest.fn().mockRejectedValue('async error by hand');
			try {
				const v6 = await mockFn6();
			} catch (err: any) {
				console.log('reject的结果,被外包作为错误(异常)处理:', err);
			}

			//same as jest.fn().mockImplementationOnce(() => Promise.reject(value));
			const mockFn7 = jest.fn().mockResolvedValue('successfully')
				.mockRejectedValueOnce('error only once.');
			try {
				await mockFn7();
			} catch (err: any) {
				console.log('reject的结果,只会出现一次:', err);
			}
			//现在可以正常了.successfully successfully successfully
			console.log(await mockFn7(), await mockFn7(), await mockFn7());
		}
	}, {
		desc: "正常导入的方法,内部调用了被mock的方法,应该调用谁呢?",
		func: async () => {
			//这句不论写在哪,总是被提升到第一行,为了增加可读性,就放这吧.
			jest.mock('do-jest-module/mocked-bar-es6');

			const mockBar = await import('do-jest-module/mocked-bar-es6'); //被mock
			const caller = await import('do-jest-module/bar-caller');		//尚未mock

			mockBar.secondFunc.mockImplementation(() => "hello,this is mock bar");

			console.log(`没有被mock的方法caller.callSecondFun,内部调用secondFunc,
				也是mock版本的secondFunc,就跟在此手工调用它一样:`);
			caller.callSecondFun();

			expect(mockBar.secondFunc).toBeCalledTimes(1);
			expect(mockBar.secondFunc).toBeCalledWith();
		}
	}, {
		desc: "jest.MockedFunction的用法(version >= 24.9.0);为了强类型Mock函数,以便在" +
			"实现方法中推导类型.但是试验下来,感觉没有什么变化.... 以后再说了...",
		func: async () => {
			// jest.mock('do-jest-module/add');
			// const add = await import('do-jest-module/add'); //被mock
			//		const caller = await import('do-jest-module/bar-caller');		//尚未mock

			// use jest.MockedFunction to represent a function that
			//has been replaced by a Jest mock.
			const t = typeof add;
			const mockAdd = jest.fn() as jest.MockedFunction<typeof add>;
			// mockAdd.mockImplementation((a: number, b: number) => {
			// 	return a - b;
			// });
			mockAdd.mockImplementation((a: string, b: string) => {
				return [a, b];
			});
			const r = mockAdd(8, 9);
			// expect(mockAdd).toBeCalledTimes(1);
			// expect(r).toBe(-1);
			// expect(r).not.toBe(17);
			// expect(mockAdd).toBeCalledWith(8, 9);
		}
	}

];

export default () => {

	// all of
	// for (let i = 0; i < couple.length; i++) {
	// 	test(couple[i].desc, couple[i].func);
	// }

	//one by one
	const n = 13;
	test(couple[n].desc, couple[n].func);
};
