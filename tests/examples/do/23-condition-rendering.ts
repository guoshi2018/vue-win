import { shallowMount, mount, VueWrapper } from '@vue/test-utils'

import ConditionNav from 'target-vue/condition-nav';

let wrapper: VueWrapper<any>;
let snapIndex: number;

beforeAll(() => {
	snapIndex = 0;
});
beforeEach(() => {
	wrapper = mount(ConditionNav);		//default to todoapp
});

afterEach(() => {
	expect(wrapper.html()).toMatchSnapshot('<' + ++snapIndex + '>');
});

const couple = [
	{
		desc: 'renders a profile link,',
		func: () => {
			const profileLink = wrapper.get('#profile');
			expect(profileLink.text()).toEqual('sina');

			//// Using `wrapper.get` would throw and make the test fail.
			//expect(wrapper.find('#admin').exists()).not.toBe(true);
			expect(wrapper.find('#admin').exists()).toBe(false);
		},
	}, {
		desc: 'to assert that the admin link is rendered when admin is true',
		func: async () => {
			await wrapper.setData({
				admin: true,
			});
			//or
			// wrapper = mount(ConditionNav, {
			// 	data() {
			// 		return {
			// 			admin: true,
			// 		};
			// 	}
			// });
			expect(wrapper.get('#admin').text()).toEqual('baidu for admin');
			wrapper.get('#admin').trigger('click'); //通过,但不会真的发起链接的打开

		}
	}, {
		desc: ', only want to hide/show an element while keeping it in the DOM.',
		func: async () => {
			expect(wrapper.find('#user-dropdown').exists()).toBe(true);
			expect(wrapper.get('#user-dropdown').isVisible()).toBe(false);
			await wrapper.setData({
				shouldShowDropdown: true,
			});
			expect(wrapper.get('#user-dropdown').isVisible()).toBe(true);
		}
	},
];

export default () => {
	for (let i = 0; i < couple.length; i++) {
		test(couple[i].desc, couple[i].func);
	}
};

/*
Conclusion
Use find() along with exists() to verify whether an element is in the DOM.
Use get() if you expect the element to be in the DOM.
The data mounting option can be used to set default values on a component.
Use get() with isVisible() to verify the visibility of an element that is in the DOM
*/