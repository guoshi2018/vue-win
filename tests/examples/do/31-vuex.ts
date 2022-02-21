import { createStore, useStore } from 'vuex';
import { defineComponent } from 'vue';
import { shallowMount, mount, VueWrapper } from '@vue/test-utils'

let wrapper: VueWrapper<any>;
let snapIndex: number;

beforeAll(() => {
	snapIndex = 0;
});
beforeEach(() => {
	//	wrapper = mount(XXX);		//default to todoapp
});

afterEach(async () => {
	expect(wrapper.html()).toMatchSnapshot('<' + ++snapIndex + '>');
});

//#region stores
// const store = createStore({

// });
const key = Symbol();

const store = createStore({
	state() {
		return {
			count: 0
		}
	},
	mutations: {
		increment(state: any) {
			state.count += 1
		}
	}
});
const store1 = createStore({
	state() {
		return {
			count: 0
		}
	},
	mutations: {
		increment(state: any) {
			state.count += 1
		}
	}
});
const guoshiStore = {			//用于mock,即global.mocks.$store:guoshiStore
	state: {
		count: 25,
	},
	commit: jest.fn(),
};
const createVuexStore = (initialState: Record<string, any>) =>
	createStore({
		state: {
			count: 0,
			...initialState,
		},
		mutations: {
			increment(state, value = 1) {
				state.count += value;
			}
		}
	});
//#endregion
//#region apps
const App1 = defineComponent({
	template: `
    <div>
      <button @click="increment" />
      Count: {{ count }}
    </div>
  `,
	computed: {
		count() {
			return this.$store.state.count
		}
	},
	methods: {
		increment() {
			this.$store.commit('increment')
		}
	}
});
const CompositionAppWithoutStoreKey = defineComponent({
	setup() {
		const theStore = useStore();
	},
	template: '<div>hello</div>'
});
const CompositionAppWithStoreKey = defineComponent({
	setup() {
		const theStore = useStore(key);
	},
	template: '<div>temp sentence</div>'
})

//#endregion



const couple = [
	{
		desc: 'The store simply stores a count',
		func: async () => {
			wrapper = mount(App1, {
				global: {
					plugins: [store1],
				},
			});
			await wrapper.find('button').trigger('click');
			expect(wrapper.html()).toContain('Count: 1');
		},
	}, {
		desc: 'using global.mocks',
		func: async () => {
			wrapper = mount(App1, {
				global: {
					mocks: {
						$store: guoshiStore,
					}
				},
			});
			expect(wrapper.html()).toContain('Count: 25');
			await wrapper.find('button').trigger('click');
			expect(guoshiStore.commit).toHaveBeenCalled();

			expect(wrapper.vm.$store.commit).toHaveBeenCalled();
			expect(wrapper.vm.$store === guoshiStore).toBeTruthy();
		}
	}, {
		desc: 'Testing Vuex in Isolation',
		func: () => {
			store1.commit('increment');
			expect(store1.state.count).toBe(2);	//
		}
	}, {
		desc: 'increment mutation without passing a value',
		func: () => {
			const store = createVuexStore({ count: 20 });
			store.commit('increment');
			expect(store.state.count).toBe(21);
		},
	}, {
		desc: 'increment mutation with a value',
		func: () => {
			const store = createVuexStore({ count: -100 });
			store.commit('increment', -8);
			expect(store.state.count).toBe(-108);
		}
	}, {
		desc: ' providing the unkeyed useStore',
		func: () => {
			wrapper = mount(CompositionAppWithoutStoreKey, {
				global: {
					provide: {
						//	store: store, //ok
						store: store1,		//ok
					}
				}
			})
		}
	}, {
		desc: 'Providing the Keyed useStore using global.provide',
		func: () => {
			wrapper = mount(CompositionAppWithStoreKey, {
				global: {
					provide: {
						//	[key]: store1,		//ok
						[key]: store				//ok
					}
				}
			})
		}
	}, {
		desc: 'Providing the Keyed useStore using global.plugins',
		func: () => {
			wrapper = mount(CompositionAppWithStoreKey, {
				global: {
					// to pass options to plugins, use the array syntax.
					plugins: [[store1, key]],
				}
			})
		}
	}
];

export default () => {
	for (let i = 0; i < couple.length; i++) {
		test(couple[i].desc, couple[i].func);
	}
};