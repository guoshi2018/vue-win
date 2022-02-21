import { shallowMount, mount, VueWrapper } from '@vue/test-utils'
import { defineComponent } from 'vue';

//#region global variable
let wrapper: VueWrapper<any>;
let snapIndex: number;
//#endregion

//#region  hook
beforeAll(() => {
	snapIndex = 0;
});
beforeEach(() => {
	const el = document.createElement('div');
	el.id = 'modal';
	document.body.appendChild(el);
});
afterEach(async () => {
	//	document.body.outerHTML = '';
	//expect(wrapper.html()).toMatchSnapshot('<' + ++snapIndex + '>');
});
//#endregion

//#region component
const Signup = defineComponent({
	template: `
		<div>
			<form @submit.prevent="submit">
				<input v-model="username" />
			</form>
		</div>
	`,
	emits: ['signup'],
	data() {
		return {
			username: ''
		}
	},
	computed: {
		error() {
			return this.username.length < 8
		}
	},
	methods: {
		submit() {
			if (!this.error) {
				this.$emit('signup', this.username)
			}
		}
	}
});
const Navbar = defineComponent({
	template: `
	<Teleport to="#modal">
    <Signup />
  </Teleport>
	`,
	components: { Signup },
});
//#endregion


//#region testing ...
const couple = [
	{
		desc: 'emits a signup event when valid',
		func: async () => {
			//注意,beforeEach hook中,已经准备好 id='modal' 的 div
			const wrapper = mount(Navbar);
			console.log('由于唯一的元素Signup被teleport到body.div,所以这里显示的html应该为空:\n', wrapper.html());
			const wSignup = wrapper.getComponent(Signup);
			console.log('这里可以看到signup,说明被teleport出去的Signup,仍然可被wrapper维护:\n', wSignup.html());

			//操作signup:
			//const un = 'guoshi';		//长度小于8,expect将失败
			const un = 'guoshiguoshi';
			await wSignup.get('input').setValue(un);

			await wSignup.get('form').trigger('submit.prevent');//或者submit也行
			expect(wSignup.emitted().signup[0]).toEqual([un]);
		},
	},
];
//#endregion

export default () => {
	for (let i = 0; i < couple.length; i++) {
		test(couple[i].desc, couple[i].func);
	}
};
/*
Conclusion#
Create a teleport target with document.createElement.
Find teleported components using getComponent or findComponent which operate on the Virtual DOM level.
*/
