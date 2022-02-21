import { shallowMount, mount, VueWrapper } from '@vue/test-utils'

import PassDataPassword from 'target-vue/pass-data-password';

let wrapper: VueWrapper<any>;
let snapIndex: number;

beforeAll(() => {
	snapIndex = 0;
});
beforeEach(() => {
	wrapper = mount(PassDataPassword);		//default to todoapp
});

afterEach(() => {
	//expect(wrapper.html()).toMatchSnapshot('<' + ++snapIndex + '>');
});

const couple = [
	{
		desc: 'renders an error if length is too short',
		func: async () => {
			wrapper = mount(PassDataPassword, {
				props: {
					minLength: 10,
				},
				data() {
					return {
						password: 'short',
					};
				}
			});
			expect(wrapper.html()).toContain("at least 10");

			await wrapper.setProps({
				minLength: 5,
			});
			expect(wrapper.find('.error').exists()).toBeFalsy();

			await wrapper.setData({
				password: '1234',
			});
			expect(wrapper.find('.error').exists()).toBeTruthy();

			await wrapper.get('input').setValue('123kfi');
			expect(wrapper.find('.error').exists()).toBeFalsy();
		},
	},
];

export default () => {
	for (let i = 0; i < couple.length; i++) {
		test(couple[i].desc, couple[i].func);
	}
};

/*
Conclusion#
	use the props and data mounting options to pre-set the state of a component.
	Use setProps() to update a prop during a test.
	Use the await keyword before setProps() to ensure the Vue will update 
	the DOM before the test continues.
	Directly interacting with your component can give you greater coverage. 
	Consider using setValue or trigger in combination with data to
	ensure everything works correctly.
*/