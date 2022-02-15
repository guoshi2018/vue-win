import { shallowMount, mount, VueWrapper } from '@vue/test-utils'

import XXX from '......';

let wrapper: VueWrapper<any>;
let snapIndex: number;

beforeAll(() => {
	snapIndex = 0;
});
beforeEach(() => {
	wrapper = mount(XXX);		//default to todoapp
});

afterEach(() => {
	expect(wrapper.html()).toMatchSnapshot('<' + ++snapIndex + '>');
});

const couple = [
	{
		desc: '',
		func: () => { },
	}, {
		desc: '',
		func: () => { }
	}, {
		desc: '',
		func: () => { }
	},
];

export default () => {
	for (let i = 0; i < couple.length; i++) {
		test(couple[i].desc, couple[i].func);
	}
};