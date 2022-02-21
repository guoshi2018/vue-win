import { shallowMount, mount, VueWrapper } from '@vue/test-utils'

import Count from 'target-vue/count';

let wrapper: VueWrapper<any>;
let snapIndex: number;

beforeAll(() => {
	snapIndex = 0;
});
beforeEach(() => {
	wrapper = mount(Count);		//default to todoapp
});

afterEach(() => {
	//	expect(wrapper.html()).toMatchSnapshot('<' + ++snapIndex + '>');
});

const couple = [
	{
		desc: 'simulate a mouse click,and emits an event with count when clicked',
		func: () => {
			wrapper.get('#inc').trigger('click');		//ok
			wrapper.find('button').trigger('click');		//ok too. for only one button exist

			expect(wrapper.emitted()).toHaveProperty('increment');

			// `emitted()` accepts an argument. It returns an array with all the
			// occurrences of `this.$emit('increment')`.
			const eventArr1 = wrapper.emitted().increment;
			const eventArr2 = wrapper.emitted('increment');
			expect(eventArr1).toEqual(eventArr2);
			console.log('两种写法一致的结果,都是:', eventArr2);

			// We have "clicked" twice, so the array of `increment` should
			// have two values.
			expect(eventArr2).toHaveLength(2);

			// Assert the result of the first click.
			// Notice that the value is an array.
			expect(eventArr1[0]).toEqual([10])

			// Then, the result of the second one.
			expect(eventArr1[1]).toEqual([20])
		},
	}, {
		desc: ' emit an object with additional information',
		func: () => {
			wrapper.find('a').trigger('click');
			wrapper.get('#dec').trigger('click');
			const eventArgs = wrapper.emitted().subtract;
			console.log(eventArgs);

			// We have "clicked" twice, so the array of `increment` should
			// have two values.
			expect(eventArgs).toHaveLength(2)

			// Then, we can make sure each element of `wrapper.emitted('increment')`
			// contains an array with the expected object.
			expect(eventArgs[0]).toEqual([
				{ currentCount: -1, isEven: false, info: 'hello,world' },
				'this is second arg',
				1988,
				12,
				25
			])

			expect(eventArgs[1]).toEqual([
				{ currentCount: -2, isEven: true, info: 'hello,world' },
				'this is second arg',
				1988,
				12,
				25
			])

		}
	}
];

export default () => {
	for (let i = 0; i < couple.length; i++) {
		test(couple[i].desc, couple[i].func);
	}
};

/*
Conclusion#
Use emitted() to access the events emitted from a Vue component.
emitted(eventName) returns an array, where each element represents one event emitted.
Arguments are stored in emitted(eventName)[index] in an array in the same order they are emitted.
*/