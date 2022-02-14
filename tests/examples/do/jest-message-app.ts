
import { mount, shallowMount, VueWrapper } from '@vue/test-utils';

import MessageApp from 'target-vue/message-app';


export default () => {
	let msgs: Array<string> = [];
	beforeEach(() => {
		msgs = ["Cat", "Dog"];
	});

	it(',mount message app with its children', () => {
		const vm = mount(MessageApp, {
			data: () => ({
				messages: msgs,
			}),
		});
		console.log(vm.html());
		console.log(vm.text());
		console.log(vm.element);
		expect(vm.text()).toEqual(msgs.join(''));
		expect(vm.html()).toMatchSnapshot('msgapp-1');
	});

	it(',shallowMount message app without its children', () => {
		const vm = shallowMount(MessageApp, {
			data: () => ({
				messages: msgs,
			}),
		});
		console.log(vm.html());
		console.log(vm.text());
		console.log(vm.element);
		expect(vm.text()).toEqual('');
		expect(vm.html()).toMatchSnapshot('msgapp-2');
	});

}