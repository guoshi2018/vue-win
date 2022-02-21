import { shallowMount, mount, VueWrapper } from '@vue/test-utils'

import TransitionDemo from 'target-vue/29-transition';

let wrapper: VueWrapper<any>;
let snapIndex: number;

beforeAll(() => {
	snapIndex = 0;
});
beforeEach(() => {
	//wrapper = mount(XXX);		//default to todoapp
});

afterEach(() => {
	expect(wrapper.html()).toMatchSnapshot('<' + ++snapIndex + '>');
});

const couple = [
	{
		desc: 'works with transitions',
		func: async () => {
			wrapper = mount(TransitionDemo);
			expect(wrapper.find('hello').exists()).toBe(false)

			await wrapper.find('button').trigger('click')

			// After clicking the button, the <p> element exists and is visible
			expect(wrapper.get('p').text()).toEqual('hello')
		},
	},
];

export default () => {
	for (let i = 0; i < couple.length; i++) {
		test(couple[i].desc, couple[i].func);
	}
};