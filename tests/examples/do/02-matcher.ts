
export default () => {
	test("匹配器测试", () => {

		const n = null;
		expect(n).toBeNull();
		expect(n).toBeDefined();
		//expect(n).toBeUndefined();
		//expect(n).toBeTruthy();
		expect(n).toBeFalsy();

		//expect(n).not.toBeNull();
		//expect(n).not.toBeDefined();
		expect(n).not.toBeUndefined();
		expect(n).not.toBeTruthy();
		//expect(n).not.toBeFalsy();

		const z = 0;
		expect(z).not.toBeNull();
		expect(z).toBeDefined();
		expect(z).not.toBeUndefined();
		expect(z).not.toBeTruthy();
		expect(z).toBeFalsy();

		//大多数的比较数字有等价的匹配器。
		let value = 2 + 2;
		expect(value).toBeGreaterThan(3);
		expect(value).toBeGreaterThanOrEqual(3.5);
		expect(value).toBeLessThan(5);
		expect(value).toBeLessThanOrEqual(4.5);

		// toBe and toEqual are equivalent for numbers
		expect(value).toBe(4);
		expect(value).toEqual(4);

		//对于比较浮点数相等，使用 toBeCloseTo 而不是 toEqual，
		//因为你不希望测试取决于一个小小的舍入误差。
		value = 0.1 + 0.2;
		//expect(value).toBe(0.3);    //这句会报错，因为浮点数有舍入误差
		expect(value).toBeCloseTo(0.3); // 这句可以运行

		//检查对具有 toMatch 正则表达式的字符串︰
		expect('team').not.toMatch(/I/);
		expect('Christoph').toMatch(/stop/);

		//通过 toContain来检查一个数组或可迭代对象是否包含某个特定项
		const shoppingList = [
			'diapers',
			'kleenex',
			'trash bags',
			'paper towels',
			'milk',
		];
		expect(shoppingList).toContain('milk');
		expect(new Set(shoppingList)).toContain('milk');
	});
};
