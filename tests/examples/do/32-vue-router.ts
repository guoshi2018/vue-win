import { shallowMount, mount, VueWrapper, flushPromises } from '@vue/test-utils'
import { defineComponent } from 'vue';
import { createRouter, createWebHistory, useRoute, useRouter } from 'vue-router';


//let wrapper: VueWrapper<any>;
let snapIndex: number;
//#region hook
beforeAll(() => {
	snapIndex = 0;
});
beforeEach(() => {
	//	wrapper = mount(XXX);		//default to todoapp
});

afterEach(async () => {
	//expect(wrapper.html()).toMatchSnapshot('<' + ++snapIndex + '>');
});
//#endregion
//#region Component
const OptionalComponent = defineComponent({
	template: `<button @click='redirect'>Click to Edit</button>`,
	props: ['isAuthenticated'],
	methods: {
		redirect() {
			if (this.isAuthenticated) {
				this.$router.push(`/posts/${this.$route.params.id}/edit`);
			} else {
				this.$router.push('/404');
			}
		},
	}
});

const CompositComponent = defineComponent({
	template: `
		<button @click="redirect">click to Edit</button>
		<router-link to='/guoshi'>welcome guoshi</router-link>
		<router-view />
	`,
	//router,route使用属性传入,以适应使用mock或者real形式.
	props: ['isAuthenticated', 'innerRouter', 'innerRoute'],
	setup(props) {
		//const theRouter = useRouter();
		//const theRoute = useRoute();
		// const redirect = () => {
		// 	if (props.isAuthenticated) {
		// 		theRouter.push(`/post/${theRoute.params.id}/edit`);
		// 	} else {
		// 		theRouter.push('/404');
		// 	}
		// };

		const redirect = () => {
			if (props.isAuthenticated) {
				props.innerRouter.push(`/posts/${props.innerRoute.params.id}/edit`);
			} else {
				props.innerRouter.push('/404');
			}
		};

		return {
			redirect,
		}
	}
});
//#endregion
//#region mock router/route
const mockRoute = {
	params: {
		id: 101,
	},
};
const mockRouter = {
	push: jest.fn(),
};
//#endregion
//#region Component
const App = {
	template: `
		<h1>App</h1>
		<router-link to='/posts'>Go to posts</router-link>
		<router-view />
	`,
};
const Root = {
	template: `
				<h1>Root:Welcome to the bloggin app</h1>
				<router-view />
			`,
};
const Posts = {
	template: `
		<h1>Posts</h1>
		<ul>
			<li v-for="post in posts" :key="post.id">
				{{post.name}}
				<router-view />
			</li>
		</ul>
	`,
	data() {
		return {
			posts: [
				{ id: 1, name: 'testing vue router' },
				{ id: 2, name: 'let us go to bed' },
			],
		};
	}
}

//#endregion

//#region real route/router
const routes = [
	{
		path: '/',
		component: Root,
		name: 'root',
	}, {
		path: '/posts',
		component: Posts,
	}, {
		path: '/guoshi',
		component: {
			template: '<h5>this is guoshi content.</h5>',
		},
	}, {
		path: '/posts/:userid(\\d+)/edit',	//userid只能式数值
		//path: '/posts/:userid/edit',		//userid可以为任意类型
		component: {
			template: '<h5>userid:{{$route.params.userid}}.here,you can edit your post</h5>'
		}
	}
];
const router = createRouter({
	history: createWebHistory(),
	routes: routes,
})
//#endregion

const couple = [
	{
		//You might want to test the entire system in an end-to-end manner. 
		//You could consider a framework like Cypress for full system tests using a real browser
		desc: `选项式组件,采用mock router/route测试,形式为global.mocks:{...}`,
		func: async () => {
			const wrapper = mount(OptionalComponent, {
				props: {
					isAuthenticated: true,
				},
				global: {
					mocks: {
						$route: mockRoute,
						$router: mockRouter,
					}
				},
			});
			mockRouter.push.mockClear();
			await wrapper.find('button').trigger('click');
			expect(mockRouter.push).toHaveBeenCalledTimes(1);
			expect(mockRouter.push).toHaveBeenCalledWith('/posts/101/edit');
		},
	}, {
		desc: `选项式组件,采用 real router, 形式为:global.plugins:[router].
以将/guoshi组件的内容插入到Posts组件的<router-view/>里面为例`,
		func: async () => {  // 
			router.push('/guoshi');	//在router.routes中(路由表)查找该path的route,准备好它的template备用
			await router.isReady();
			const wrapper1 = mount(Posts, {
				global: {
					//router is plugin,上面准备好的template用在被mount的App1的<router-view></router-view>(如果有)
					plugins: [router],
				}
			});
			console.log("/guoshi插入到Posts:\n", wrapper1.html());

			//如果不卸载,后续的操作引发错误:
			//TypeError: Cannot read properties of null(reading '_history')
			wrapper1.unmount();			//下同
		},
	}, {
		desc: `选项式组件,采用 real router, 形式为:global.plugins:[router].
以将Posts组件的内容,插入到 Root组件的<router-view/>里面为例`,
		func: async () => {
			router.push('/posts');
			await router.isReady();
			const wrapper2 = mount(Root, {
				global: {
					plugins: [router],
				},
			});
			console.log("Posts插入到Root:\n", wrapper2.html());
			wrapper2.unmount();
		}
	}, {
		desc: `选项式组件,采用 real router, 形式为:global.plugins:[router].
以将Root 组件的内容,插入到 App 组件的<router-view/>里面为例`,
		func: async () => {
			router.push('/');
			await router.isReady();
			const wrapper3 = mount(App, {
				global: {
					plugins: [router],
				},
			});
			console.log("Root插入到App:\n", wrapper3.html());
			wrapper3.unmount();
		}
	}, {
		desc: '仅仅是push,还是不能实现完全的嵌套:俄罗斯套娃',
		func: async () => {
			router.push('/guoshi');
			router.push('/posts');
			router.push('/');
			await router.isReady();
			const wrapper = mount(App, {
				global: {
					plugins: [router],
				},
			});
			console.log("三次插入:\n", wrapper.html());
			wrapper.unmount();
		}
	}, {
		desc: "现在还是继续文档示范:使用真实的router/route,以选项式组件为例",
		func: async () => {
			router.push('/');
			await router.isReady();
			const wrapper = mount(App, {
				global: {
					plugins: [router],
				},
			});
			expect(wrapper.html()).toContain('Welcome to');

			//有下面的flushPromise,这里的trigger的await就无关紧要;但只有trigger的await是不够的
			await wrapper.find('a').trigger('click');

			//其实点击链接后,如果没有下面一句,wrapper还是原来的wrapper,无变化:
			await flushPromises();

			console.log("点击链接后:\n", wrapper.html());

			//所以如果没有flushPromises,下面这句就失败:
			expect(wrapper.html()).toContain('go to bed');
			wrapper.unmount();
		}
	}, {
		desc: 'mock router/route用于组合式组件测试:将该router/route从组件的自定义属性传入',
		func: () => {
			//js写法:
			// jest.mock('vue-router', () => ({
			// 	useRoute: jest.fn(),
			// 	useRouter: jest.fn(() => ({
			// 		push: () => { }
			// 	}))
			// }));
			//这里就红波浪线了,
			//https://test-utils.vuejs.org/guide/advanced/vue-router.html#using-a-mocked-router-with-composition-api
			//useRoute.mockImplementationOnce()

			//ts写法,采用外面自定义的mockRoute/mockRouter
			const auth = Date.now() % 2 == 0;
			const wrapper = mount(CompositComponent, {
				props: {
					isAuthenticated: auth,
					innerRoute: mockRoute,
					innerRouter: mockRouter,
				},
				global: {
					// Stubs for router-link and router-view in case they're rendered in your template
					//但是目前看不出变化
					stubs: ["router-link", "router-view"],
				}
			});
			//防止前面测试点击次数(如果发生过)的影响
			mockRouter.push.mockClear();
			console.log('mock router/route + combined component:\n', wrapper.html());//这里看不出
			expect(wrapper.html()).toMatchSnapshot();	//这里看不出
			wrapper.find('button').trigger('click');

			expect(mockRouter.push).toHaveBeenCalledTimes(1);
			expect(mockRouter.push).toHaveBeenCalledWith(auth ? '/posts/101/edit' : '/404');
			wrapper.unmount();
		}
	}, {
		//注意,如果要充分测试,还需要posts的每个post改为链接,点击方能进入其修改页面,已经在routes中做了定义
		desc: 'real router/route,用于组合式组件,这个和官方文档出入较大',
		func: async () => {
			let id: number | string;
			//id = 'cannot use string,or exception'; //能否采用,见routes的相应定义
			id = 1020;
			router.push('/');
			await router.isReady();
			const wrapper = mount(CompositComponent, {
				props: {
					isAuthenticated: true,
					innerRouter: router,
					innerRoute: {
						params: {
							id
						},
					},
				},
				global: {
					plugins: [router],
				},
			});

			await wrapper.find('button').trigger('click');
			await flushPromises();	//等待加载完毕
			console.log("real router/route,用于组合式组件,点击后得到:\n", wrapper.html());
			expect(wrapper.find('h5').text()).toBe('userid:' + id + '.here,you can edit your post');
			wrapper.unmount();
		}
	}
];

export default () => {
	for (let i = 0; i < couple.length; i++) {
		test(couple[i].desc, couple[i].func);
	}
	// const i = couple.length - 1;
	// test(couple[i].desc, couple[i].func);
};
/*
Conclusion#
You can use a real router instance in your tests.

There are some caveats, though: Vue Router 4 is asynchronous, and we need to 
take it into account when writing tests.

For more complex applications, consider mocking the router dependency and focus 
on testing the underlying logic.

Make use of your test runner's stubbing/mocking functionality where possible.

Use global.mocks to mock global dependencies, such as this.$route and this.$router.

For those who prefer a non-manual approach, the library vue-router-mock created 
by Posva is also available as an alternative:
https://github.com/posva/vue-router-mock

对于选项式组件:
	1)mock route/router, 采用global.mocks:{$router:mockRouter,$route:mockRoute}
	2)real route/router, 采用global.plugins:[router] .其中router中已经包含
对于组合式组件(与官方文档出入较大,推荐):
	1)mock route/router, 采用自定义属性props:xxx接入
	2)real route/router, 同上
*/