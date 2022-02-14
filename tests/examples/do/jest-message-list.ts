
import { mount } from '@vue/test-utils';

//必须如此导入,才能在.d.ts中声明成功
import MessageList from 'target-vue/message-list';

export default () => {

	it(',test message-list vue alonely ', () => {
		const msgs = ["Cat", "Dog"];
		const wrapper = mount(MessageList, {
			props: {
				messages: msgs
			},
		});
		expect(wrapper.props()["messages"]).toEqual(msgs);
		expect(wrapper.html()).toMatchSnapshot('message-list inner')
	});
}