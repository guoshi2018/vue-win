
import { shallowMount, mount, VueWrapper } from '@vue/test-utils'
import Todos from 'target-vue/todo-app';
import HelloWorld from '@/components/HelloWorld.vue';
import { defineComponent, h } from 'vue';

const Layout1 = {
	template: `
    <div>
      <h1>Welcome!</h1>
      <main>
        <slot />
      </main>
      <footer>
        Thanks for visiting.
      </footer>
    </div>
	`
};

const Layout2 = {
	template: `
    <div>
      <header>
        <slot name="header" />
      </header>

      <main>
        <slot name="main" />
      </main>
      <footer>
        <slot name="footer" />
      </footer>
    </div>  `
};

const Layout3 = {
	template: `
    <div>
      <header>
        <slot name="header" />
      </header>

      <main>
        <slot name="main" />
      </main>
			<aside>
				<slot name="sidebar"/>
			</aside>
      <footer>
        <slot name="footer" />
      </footer>
    </div>  `
};

const Layout4 = {
	template: `
    <div class="scoped">
      <slot name="scoped" v-bind="{ msg }" />
    </div>
  `,
	data() {
		return {
			msg: 'World'
		}
	}
};


let wrapper: VueWrapper<any>;
let snapIndex: number;

beforeAll(() => {
	snapIndex = 0;
});
beforeEach(() => {
	//wrapper = mount(XXX);		//default to todoapp
});

afterEach(() => {
	expect(wrapper.html()).toMatchSnapshot('<' + ++snapIndex + '>');
});

const couple = [
	{
		desc: 'test to ensure the default slot content is rendered',
		func: () => {
			wrapper = mount(Layout1, {
				slots: {
					default: 'Main content to test',
				},
			});
			expect(wrapper.html()).toContain('Main content');

			//verify the default slot content is rendered inside <main>
			expect(wrapper.find('main').text()).toContain('Main content');
			expect(wrapper.find('main').text()).toEqual('Main content to test');
		},
	}, {
		desc: 'layout full page layout',
		func: () => {
			const htmlHeader = '<div>Header</div>';
			const htmlMain = '<div>Main Content</div>';
			const htmlFooter = '<div>Footer</div>';
			wrapper = mount(Layout2, {
				slots: {
					header: htmlHeader,
					main: htmlMain,
					footer: htmlFooter,
				}
			});
			expect(wrapper.html()).toContain(htmlHeader);
			expect(wrapper.html()).toContain(htmlMain);
			expect(wrapper.html()).toContain(htmlFooter);

			expect(wrapper.find('header').element.innerHTML).toBe(htmlHeader);
			expect(wrapper.find('maiN').element.innerHTML).toBe(htmlMain);
			expect(wrapper.find('footer').element.innerHTML).toBe(htmlFooter);

		}
	}, {
		desc: 'pass an array of slots',
		func: () => {
			wrapper = mount(Layout1, {
				slots: {
					default: [
						'<div id="one">One One One</div>',
						'<div id="tow">Tow Tow Tow</div>',
					],
				},
			});
			expect(wrapper.find('#one').exists()).toBe(true);
			expect(wrapper.find('#tow').exists()).toBe(true);
		}
	}, {
		desc: 'pass a render function, an object with template' +
			'or even an SFC imported from a vue file to a slot mounting option',
		func: () => {
			wrapper = mount(Layout3, {
				slots: {
					header: Todos,			//ok 无props
					main: h('div', 'Mian content using render function'),
					sidebar: { template: '<div>Sidebar</div>' },
					footer: '<div>Foot is here</div>',
				}
			});
			//查看html snapshot
		}
	}, {
		desc: '上面是传递不带prop的组件给插槽,下面传带prop的组件',
		func: () => {

			const tempCom = defineComponent({
				components: { HelloWorld },
				template: '<hello-world :msg="hey"></hello-world>',
				data() {
					return {
						hey: 'so musch jest knowledge you wanna learn',
					};
				},
			});
			wrapper = mount(Layout3, {
				slots: {
					header: tempCom,
					main: h('div', 'Mian content using render function'),
					sidebar: { template: '<div>Sidebar</div>' },
					footer: '<div>Foot is here</div>',
				}
			});
			//查看html snapshot
		}
	}, {
		desc: 'Scoped slots and bindings are also supported.',
		func: () => {
			wrapper = mount(Layout4, {
				slots: {
					scoped: `<template #scoped="obj">
						Hello {{obj.msg}}
					</template>`
				},
			});
			expect(wrapper.html()).toContain('Hello World');
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
Use the slots mounting option to test components using <slot> are rendering content correctly.
Content can either be a string, a render function or an imported SFC.
Use default for the default slot, and the correct name for a named slots.
scoped slots and the # shorthand is also supported.
*/