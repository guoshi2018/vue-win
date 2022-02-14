
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue';

export default () => {
	it('renders props.msg of HelloWorld, when passed', () => {
		const msg = 'new message is that'
		const wrapper = shallowMount(HelloWorld, {
			props: { msg }
		})
		expect(wrapper.text()).toMatch(msg)
	});
}
