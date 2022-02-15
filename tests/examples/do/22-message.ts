
import { shallowMount, mount, VueWrapper } from '@vue/test-utils'

import MessageList from 'target-vue/message-list';
import MessageApp from 'target-vue/message-app';


const msgs: Array<string> = ["Cat", "Dog"];
let snapIndex: number;
beforeAll(() => {
	snapIndex = 0;
});

//每个wrapper都不一样(没有在beforeAll中赋值),进入afterEach回调后,wrapper将变为undefined
afterEach(() => {
	//expect(wrapper.html()).toMatchSnapshot('<' + ++snapIndex + '>');
});

const couple = [
	{
		desc: ',mount message app with its children',
		func: () => {
			const wrapper = mount(MessageApp, {
				data: () => ({
					messages: msgs,
				}),
			});
			expect(wrapper.text()).toEqual(msgs.join(''));
			expect(wrapper.html()).toMatchSnapshot('<' + ++snapIndex + '>');
		},
	}, {
		desc: ',shallowMount message app without its children',
		func: () => {
			const wrapper = shallowMount(MessageApp, {
				data: () => ({
					messages: msgs,
				}),
			});
			expect(wrapper.text()).toEqual('');
			expect(wrapper.html()).toMatchSnapshot('<' + ++snapIndex + '>');
		}
	}, {
		desc: ',test message-list vue alonely ',
		func: () => {
			const wrapper = mount(MessageList, {
				props: {
					messages: msgs
				},
			});
			expect(wrapper.props()["messages"]).toEqual(msgs);
			expect(wrapper.html()).toMatchSnapshot('<' + ++snapIndex + '>');
		}
	},
];

export default () => {
	for (let i = 0; i < couple.length; i++) {
		test(couple[i].desc, couple[i].func);
	}
};
