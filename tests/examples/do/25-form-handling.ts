import { shallowMount, mount, VueWrapper } from '@vue/test-utils'

import FormHandlingBasic from 'target-vue/form-handling-basic';
import FormHandlingComplex from 'target-vue/form-handling-complex';
import FormHandlingExtraEventData from 'target-vue/form-handling-extra-event-data';
import FormHandlingComponent from 'target-vue/form-handling-component';

let wrapper: VueWrapper<any>;
let snapIndex: number;

beforeAll(() => {
	snapIndex = 0;
});
beforeEach(() => {
	//	wrapper = mount(XXX);		//default to todoapp
});

afterEach(() => {
	//	expect(wrapper.html()).toMatchSnapshot('<' + ++snapIndex + '>');
});

const couple = [
	{
		desc: 'interacting with a basic form, and trigger click event in basic form',
		func: async () => {
			wrapper = mount(FormHandlingBasic);
			const email = 'bclz_gxy@sina.com';
			const input = wrapper.find('input');
			await input.setValue(email);
			expect(input.element.value).toBe(email);
			expect(wrapper.vm.email).toBe(email);

			await wrapper.find('button').trigger('click');
			expect(wrapper.emitted()).toHaveProperty('submit');
			//	console.log(wrapper.emitted().submit);
			expect(wrapper.emitted().submit).toEqual([[email]]);
			//	expect(wrapper.emitted('submit')[0][0]).toBe('my@mail.com') //ts编译不让过
		},
	}, {
		desc: 'Working with various form elements',
		func: async () => {
			wrapper = mount(FormHandlingComplex);
			const email = 'guoshi@yahoo.com';
			const desc = 'long long ago ,there is an emperor...';
			const city = 'peiking';

			//await wrapper.find('input[type=number]').setValue('12345');
			// const numInput = wrapper.find('input[type=number]').element as HTMLInputElement;
			// numInput.value = "12989";
			// wrapper.get('#mmt').element.textContent = 'hello';


			await wrapper.find('input[type=email]').setValue(email);
			await wrapper.find('textarea').setValue(desc);
			await wrapper.find('select').setValue(city);
			await wrapper.find('input[type=checkbox]').setValue(true);		//不用true也一样,应该
			await wrapper.find('input[type=radio][value=monthly]').setValue();

			//多種提交方式
			//	await wrapper.find('form').trigger('submit.prevent');		//ok
			//await wrapper.find('form').trigger('submit');					//ok
			//await wrapper.find('button[type=submit]').trigger('submit');	//ok
			// await wrapper.find('button[type=submit]').trigger('click');	//fail
			await wrapper.find('button[type=submit]').trigger('submit.prevent');	//ok
			console.log(wrapper.emitted());
			expect(wrapper.emitted().submit[0]).toStrictEqual([
				{
					description: desc,
					email,
					city,
					interval: 'monthly',
					subscribe: true,
				}
			]);

		}
	}, {
		desc: 'emits an event only if you lose focus to a button',
		func: async () => {
			wrapper = mount(FormHandlingExtraEventData);
			const componentToGetFocus = wrapper.find('button');
			const wrapInput = wrapper.find('input');

			//这里不等待数据响应,所以不用await
			wrapInput.trigger('blur', {
				relatedTarget: componentToGetFocus.element,
			});
			console.log(wrapper.emitted('focus-lost'));
			expect(wrapper.emitted('focus-lost')).toBeTruthy();

			//试试模拟键盘输入.结果:仍然失败
			// const docInput = wrapInput.element as HTMLInputElement;
			// docInput.focus();
			// await wrapper.trigger('keyup', {
			// 	key: "a",
			// });
			// console.log(".................:", docInput.value);

		}
	}, {
		desc: 'Testing complex Input components',
		func: async () => {
			//暂时不能运行: [Vue warn]: Failed to resolve component: v-textarea
			// wrapper = mount(FormHandlingComponent);
			// const desc = 'some new and long text....';
			// await wrapper.findComponent({ ref: 'description' }).setValue(desc);
			// wrapper.find('.submit').trigger('click');
			// expect(wrapper.emitted().submit).toEqual([[desc]]);
		}
	}
];

export default () => {
	for (let i = 0; i < couple.length; i++) {
		test(couple[i].desc, couple[i].func);
	}
};
/*
	Conclusion#
	Use setValue to set the value on both DOM inputs and Vue components.
	Use trigger to trigger DOM events, both with and without modifiers.
	Add extra event data to trigger using the second parameter.
	Assert that the DOM changed and the right events got emitted. 
	Try not to assert data on the Component instance.
*/