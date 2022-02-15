

export default () => {

	beforeEach(() => {

		console.log('beforeEach called...');
	});
	afterEach(() => {
		console.log('afterEach called...');
	});
	beforeAll(() => {
		console.log('beforeAll called...');
	});
	afterAll(() => {
		console.log('afterAll called...');
	});

	test("测试beforeEach,afterEach等重复设置的调用的第一个测试:", () => {
		console.log('第一个测试进行中...')
	});
	//To run only one test with Jest, temporarily change 
	//that test command to a test.only:
	test("测试beforeEach,afterEach等重复设置的调用的第二个测试:", () => {
		console.log('第二个测试进行中...')
	});

};