
import { compileAndroidCode } from "target-ts/fun";
export default () => {

	test("function error test:", () => {
		//测试某函数在调用时是否抛出了错误，你需要使用 toThrow。
		expect(() => compileAndroidCode()).toThrow();
		expect(() => compileAndroidCode()).toThrow(Error);

		// 你可以自己定义确切的错误消息内容或者使用正则表达式
		expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
		expect(() => compileAndroidCode()).toThrow(/JDK/);
		expect(() => compileAndroidCode()).toThrow(/UsinG thE/i);

		//注意：抛出错误的函数需要在expect的包装函数中调用，
		//否则 toThrow断言总是会失败（不会捕获到前面的错误）。例如:
		//expect(compileAndroidCode()).toThrow(/JDK/);			//failed		
	});

}
