
import { mount } from '@vue/test-utils';

//必须如此导入,才能在.d.ts中声明成功
import MessageApp from '@/../tests/examples/target/vue/components/KKK.vue';


export default () => {
	it('description...... to identify this tesing of component vue ', () => {
		const msgs = ["Cat", "Dog"];
		const wrapper = mount(MessageApp, {
			data: () => ({
				messages: msgs,
			}),
			props: {

			},
		});
		expect(wrapper.text()).toEqual(msgs.join(''));
	});
}