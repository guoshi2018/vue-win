import { App } from "vue";
import { print, getType } from "@/common/mixins/func";
const debug = true;

//print(debug, 'version:', version);

const testGetType = (): void => {
	class CustomClass { }
	class AbcClass extends CustomClass { }

	[
		123, //
		true,
		"123",
		undefined,
		null,
		{},
		{
			a: 1,
			b: "hello",
		},
		new CustomClass(),
		new AbcClass(),
		function () { },
		function f2() { },
		[],
		new Array(23),
		new RegExp(/w+/),
		/^java[s,S]+pt$/,
		new Date(1983, 13, 9),
	].forEach((v, i) => {
		const t = getType(v);
		print(debug, i, v, t);
	});
}
const testConfig = (app: App<Element>): void => {
	print(debug, app.config);
}
const raiseError = (): void => {
	const a = 3;
	const b = 0;
	print(debug, '3 divided by 0:', a / b); //这样都 raise error
	throw new Error('test.ts 引发的错误'); //不被app.config.errorHandler捕获
};

export {
	testGetType,
	testConfig,
	raiseError,
};
