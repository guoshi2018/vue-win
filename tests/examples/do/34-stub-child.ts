import axios from 'axios';
import { shallowMount, mount, VueWrapper, flushPromises, config as testConfig } from '@vue/test-utils'
import { CreateComponentPublicInstance, defineAsyncComponent, defineComponent, nextTick } from 'vue';

//import HelloWorld from '@/components/HelloWorld.vue';

//#region global variable
let wrapper: VueWrapper<any>;
let snapIndex: number;
//#endregion

//#region  hook
beforeAll(() => {
	snapIndex = 0;
});
beforeEach(() => {

});
afterEach(async () => {
	//expect(wrapper.html()).toMatchSnapshot('<' + ++snapIndex + '>');
});
//#endregion

//#region component
const FetchDataFromApi = defineComponent({
	name: 'NameOfFetchDataFromApi',
	template: `
		<h2>the result from server:</h2>
    <div>{{ result }}</div>
  `,
	async mounted() {
		const res = await axios.get('/api/info')
		this.result = res.data
	},
	data() {
		return {
			result: ''
		}
	}
});
const App = defineComponent({
	components: {
		FetchDataFromApi
	},
	template: `
    <h1>Welcome to Vue.js 3</h1>
		<div id='wrapper for com'>
    	<fetch-data-from-api />		
		</div>

  `
});
const ComplexA = {
	template: `
		<div>
			<span>ComplexA implementation is so far</span>
		</div>
	`
};
const ComplexB = {
	template: `
		<div>
			<span>ComplexB implementation is so far</span>
		</div>
	`
};
const ComplexC = {
	template: `
		<div>
			<span>ComplexC implementation is so far</span>
		</div>
	`
};
const App2 = defineComponent({
	components: { ComplexA, ComplexB, ComplexC },
	template: `
		<h1>in test, I only want this message</h1>
		<section>
			<ComplexA/>
			<main>
				<ComplexB/>
				<aside>
					<ComplexC/>
				</aside>
			</main>
		</section>
	`
});
const App3 = defineComponent({
	components: {
		HelloWorldAsync: defineAsyncComponent(() => import('@/components/HelloWorld.vue')),
		ViewOfAbout: defineAsyncComponent(() => import('@/views/AboutView.vue')),
	},
	template: `
		<h3>this is use for testing async component app</h3>
		<div>
			<h2>some other caption text</h2>
			<hello-world-async :msg='message'/>
			<view-of-about />
		</div>
	`,
	data() {
		return {
			message: 'are you ok?',
		};
	}
});
const CustomButton = {
	template: `
		<button>
			<slot name='one'/>
			<slot name='two'/>
			<slot />
			<slot name='three'/>
		</button>
	`,
};
const App4 = defineComponent({
	props: ['authenticated'],
	components: { CustomButton },
	template: `
		<div>
			<section>
				main content ,main content,...
			</section>
			<section>
				<h3>show your action you can do by a custom button!</h3>
				<custom-button>
					<template #one>
						<h1>hello,slot first</h1>
					</template>
					<template v-slot:two>
						<h2>hello,slot second</h2>
					</template>
					<template #three>
						<h3>hello,slot third</h3>
					</template>
			
						<span v-if="authenticated">Log out</span>
						<span v-else>Log in</span>					


				</custom-button>
			</section>
		</div>

	`,
});
//#endregion

//#region testing ...
const couple = [
	{
		desc: `We do not want to make the API call 
in this particular test, we just want to assert
the message is rendered. In this case, we could use the stubs,
which appears in the global mounting option.`,
		func: () => {
			const wrapper = mount(App, {
				global: {
					stubs: {
						//To stub out you can either use the key in components or the 
						//name of your component.If both are given in global.stubs the 
						//key will be used first.
						FetchDataFromApi: {				//key
							template: '<span>this is only an placehold for complex component by key',
						},
						NameOfFetchDataFromApi: {				//name
							template: '<span>this is only an placehold for complex component by name',
						},
					},
				},
			});
			console.log('采用占位符表达FetchDataFromApi:\n', wrapper.html());
			expect(wrapper.html()).toContain('Welcome to');
			expect(wrapper.html()).toContain('placehold for complex');
		},
	}, {
		desc: 'You can also get a default stub, instead of providing your own',
		func: () => {
			const wrapper = mount(App, {
				global: {
					stubs: {
						FetchDataFromApi: true,
					},
				},
			});
			console.log(`采用默认的stubs.<com/>:true表达FetchDataFromApi,
则在html中仅仅保留未解析的自定义组件最外层的标签,类似于调用shallowMount方法的结果:\n`, wrapper.html());
		},
	}, {
		desc: `当存在多个子组件,但测试都不关心时,可以逐个配置占位符形式的元素(test 1),
或者在stubs里逐个设置true(test2),还可以设置shallow属性为true即可,`,
		func: () => {
			const wrapper = mount(App2, {
				shallow: true,
			});
			console.log('设置shallow:true,一次性忽略所有子组件:\n', wrapper.html());
		}
	}, {
		desc: 'shallowMount就是上述的快捷方式',
		func: () => {
			const wrapper = shallowMount(App2);
			console.log('使用shallowMount的结果同上:\n', wrapper.html());
		}
	}, {
		desc: '除了某个自定义组件外,全部采用未解析标签',
		func: () => {
			const wrapper = mount(App2, {
				shallow: true,
				global: {
					stubs: {
						ComplexB: false,
					}
				},
			});
			console.log('这次,保留ComplexB正确渲染:\n', wrapper.html());
		}
	}, {
		desc: '正常测试包含异步组件的App3',
		func: async () => {
			const wrapper = mount(App3);
			console.log('App3的异步组件,可能还没有完全加载:\n', wrapper.html());
			await flushPromises();	//ok
			//await nextTick();		//no use
			console.log('flushPromises后,可以完全加载:\n', wrapper.html());
			wrapper.unmount();
		}
	}, {
		desc: '忽略App3的异步组件',
		func: async () => {
			const wrapper = mount(App3, {
				// global: {
				// 	stubs: {
				// 		//如果改为false,下面的两次log将看到变化,但必须先排除上面测试结果的影响
				// 		HelloWorldAsync: true, //第一种方式,使用key
				// 		NameOfAbout: true,		//第二种方式,使用组件内部定义的name属性值
				// 	}
				// }
				//or
				shallow: true,	//此时,stub的名,全部采用 {组件key}-stub
			});
			// It is not required to use 
			//async / await in the test case, because the component 
			//has been stubbed out before resolving.
			console.log('异步组件还没来得及加载,就已经被stub,只剩下未解析的自定义标签:\n', wrapper.html());
			await flushPromises();
			console.log('即使按正常套路flushPromises,也不会渲染这个被指定忽略的异步组件:\n', wrapper.html());
		}
	}, {
		desc: '测试App4,使用shallow:true以stub子组件,但是这样就无法显示当前时可登出还是可登录',
		func: () => {
			//设置@vue/test-utils的全局配置,一般在beforeAll钩子中进行
			testConfig.renderStubDefaultSlot = true;

			const wrapper = mount(App4, {
				props: {
					authenticated: true,
				},
				shallow: true,
				//		renderStubDefaultSlot: true,		//在此设置无效
			});
			console.log('无法显示当前时可登出还是可登录:\n', wrapper.html());

			//恢复上面配置,一般在afterAll中进行
			testConfig.renderStubDefaultSlot = false;

			//note:Unfortunately, due to technical limitations, this behavior 
			//is not extended to slots other than the default slot.
		}
	}
];
//#endregion

export default () => {
	for (let i = 0; i < couple.length; i++) {
		test(couple[i].desc, couple[i].func);
	}
};

/*
Conclusion#
use global.stubs to replace a component with a dummy one to simplify your tests
use shallow: true (or shallowMount) to stub out all child components
use config.renderStubDefaultSlot to render the default <slot> for a stubbed component
*/
