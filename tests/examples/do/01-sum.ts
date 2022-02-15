

import { sum } from "target-ts/fun";

export default () => {
	test('adds 1 + 2 equal 3', () => {
		expect(sum(1, 2)).toBe(3);
	});
}
