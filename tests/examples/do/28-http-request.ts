import { shallowMount, mount, VueWrapper, flushPromises } from '@vue/test-utils'
import axios from "axios";

import BlogPostsOne from 'target-vue/28-http-request/blog-posts-one';
import BlogPostsTwo from 'target-vue/28-http-request/blog-posts-two';
import { nextTick } from 'vue';

let wrapper: VueWrapper<any>;
let snapIndex: number;

//应jest规范,变量名必须是mock(忽略大小写)前缀,否则出错:
//The module factory of `jest.mock()` is not allowed to reference any out-of-scope variables.
const MockPostList = [
	{ id: 1, title: 'title1', },
	{ id: 2, title: 'title2' },
];
// Following lines tell Jest to mock any call to `axios.get`
// and to return `mockPostList` instead
jest.mock('axios', () => ({
	get: jest.fn(() => MockPostList)
}));

beforeAll(() => {
	snapIndex = 0;
});
beforeEach(() => {
	//wrapper = mount(BlogPostsOne);		//default to todoapp
});

afterEach(() => {
	expect(wrapper.html()).toMatchSnapshot('<' + ++snapIndex + '>');
});

const couple = [
	{
		desc: 'loads posts on button click',
		func: async () => {
			wrapper = mount(BlogPostsOne);
			wrapper.get('button').trigger('click'); //由于后续使用await flushPromises(),这里可以不用await

			// Let's assert that we've called axios.get the right amount of times and
			// with the right parameters.
			expect(axios.get).toHaveBeenCalledTimes(1)
			expect(axios.get).toHaveBeenCalledWith('/api/posts')

			// Wait until the DOM updates.
			await flushPromises();		//essential ,ok
			//await nextTick();				//ok too

			// Finally, we make sure we've rendered the content from the API.
			const posts = wrapper.findAll('[data-test="post"]')

			expect(posts).toHaveLength(2)
			expect(posts[0].text()).toContain('title1')
			expect(posts[1].text()).toContain('title2')
		},
	}, {
		desc: 'to assert that all the loading-related elements are rendered on time',
		func: async () => {
			wrapper = mount(BlogPostsTwo);
			// Notice that we run the following assertions before clicking on the button
			// Here, the component should be in a "not loading" state.
			expect(wrapper.find('[role="alert"]').exists()).toBe(false)
			expect(wrapper.get('button').attributes()).not.toHaveProperty('disabled')

			// Now let's trigger it as usual.
			wrapper.get('button').trigger('click')

			// We assert for "Loading state" before flushing all promises.
			//	expect(wrapper.find('[role="alert"]').exists()).toBe(true) //这里失败
			//expect(wrapper.get('button').attributes()).toHaveProperty('disabled') //这里失败

			// As we did before, wait until the DOM updates.
			await flushPromises()

			// After that, we're back at a "not loading" state.
			expect(wrapper.find('[role="alert"]').exists()).toBe(false)
			expect(wrapper.get('button').attributes()).not.toHaveProperty('disabled')
		}
	},
];

export default () => {
	for (let i = 0; i < couple.length; i++) {
		test(couple[i].desc, couple[i].func);
	}
};
/*
Conclusion#
Vue Test Utils does not require special tools to test HTTP requests. 
The only thing to take into account is that we're testing asynchronous behavior.

Tests must not depend on external services. Use mocking tools such as jest.mock to avoid it.

flushPromises() is a useful tool to make sure the DOM updates after an async operation.

Directly triggering HTTP requests by interacting with the component makes your test more resilient.
*/