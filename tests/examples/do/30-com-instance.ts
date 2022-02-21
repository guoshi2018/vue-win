import { shallowMount, mount, VueWrapper } from '@vue/test-utils'
import { defineComponent } from 'vue';

let wrapper: VueWrapper<any>;
let snapIndex: number;


beforeAll(() => {
	snapIndex = 0;
});
beforeEach(() => {
	//	wrapper = mount(XXX);		//default to todoapp
});

afterEach(async () => {
	//expect(wrapper.html()).toMatchSnapshot('<' + ++snapIndex + '>');
});

const couple = [
	{
		desc: 'a simple component that combines props and data to render a greeting:',
		func: () => {
			const Comp = {		//same as defineComponent({})
				template: '<span>{{msg1}} {{msg2}}</span>',
				props: ['msg1'],
				data() {
					return {
						msg2: 'world',
					};
				},
				computed: {
					temp1: () => 2,
					temp2: () => 'hey',
				},
				methods: {
					k1() { },
					k2() { },
				},
				emits: ['one', 'two'],
			};
			wrapper = mount(Comp, {
				props: {
					msg1: 'hello'
				}
			});
			expect(wrapper.html()).toContain('hello world');
			console.log(wrapper.vm);
		},
	}, {
		desc: 'getComponent and findComponent return a VueWrapper - much like the one get from mount.',
		func: () => {
			const words = 'sit down please.';
			const Foo = defineComponent({
				props: ['msg'],
				template: `<p>{{ msg }}</p>`
			});

			const Comp = defineComponent({
				components: { Foo },
				template: `<section><foo :msg="words" /></section>`,
				data() {
					return {
						words
					};
				}
			});

			wrapper = mount(Comp);

			expect(wrapper.getComponent(Foo).vm.msg).toBe(words)
			expect(wrapper.getComponent(Foo).props()).toEqual({ msg: words })
		},
	}
];

export default () => {
	for (let i = 0; i < couple.length; i++) {
		test(couple[i].desc, couple[i].func);
	}
};
/*
Conclusion#
use vm to access the internal Vue instance
getComponent and findComponent return a Vue wrapper. Those Vue instances are also available via vm
*/