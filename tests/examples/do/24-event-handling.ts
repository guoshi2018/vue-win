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
		}
	}
];

export default () => {
	for (let i = 1; i < couple.length; i++) {
		test(couple[i].desc, couple[i].func);
	}
};