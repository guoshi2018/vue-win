
//官方文档:A Crash Course 演练:
//https://test-utils.vuejs.org/guide/essentials/a-crash-course.html

import { shallowMount, mount, VueWrapper } from '@vue/test-utils'

import TodoApp from 'target-vue/todo-app';


let wrapper: VueWrapper<any>;
let snapIndex: number;

beforeAll(() => {
	snapIndex = 0;
});
beforeEach(() => {
	wrapper = mount(TodoApp);		//default to todoapp
});

afterEach(() => {
	expect(wrapper.html()).toMatchSnapshot('<' + ++snapIndex + '>');
});

const couple = [
	{
		desc: '简单的mount示例,比较文本内容',
		func: () => {
			const MessageComponent = {
				template: '<p>{{msg}}</p>',
				props: ['msg'],
			};
			const msg = 'hello world';
			wrapper = mount(MessageComponent, {		//an another component
				props: {
					msg
				},
			});
			expect(wrapper.text()).toBe(msg);
		},
	}, {
		desc: ' test - a todo is rendered',
		func: () => {
			const todo = wrapper.get('[data-test="todo"]'); //the first element
			expect(todo.text()).toBe('Learn Vue.js 3');
		},
	}, {
		desc: 'let the user to be able to create a new todo.',
		func: async () => {
			expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2)

			//Jest executes tests in a synchronous manner, ending the test as 
			//soon as the final function is called.Vue, however, updates the DOM asynchronously
			await wrapper.get('[data-test="new-todo"]').setValue('New todo') //arrange
			await wrapper.get('[data-test="form"]').trigger('submit')			//act

			expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(3)		//assert
		},
	}, {
		desc: 'completes a todo',
		func: async () => {
			await wrapper.get('[data-test="todo-checkbox"]').setValue(true);
			expect(wrapper.get('[data-test="todo"]').classes()).toContain('completed');
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
Use mount() to render a component.
Use get() and findAll() to query the DOM.
trigger() and setValue() are helpers to simulate user input.
Updating the DOM is an async operation, so make sure to use async and await.
Testing usually consists of 3 phases; arrange, act and assert.
*/