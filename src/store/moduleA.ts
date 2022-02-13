//namespaced未设置,为默认的全局模块
import {
	INCREMENT, ADD_COUNT, ADD_TODO, ADD_USING_OBJECT_STYLE, REVERSE,
	Payload, IVueState, Todo, TrialUnit, ExamPayload
} from "./types";
import { ActionContext, GetterTree, StoreOptions } from 'vuex'

export default {
	state() {
		return {
			count: 101,
			utterance: 'hello,world中国共产党,congratulations',
			todos: [
				{ id: 1, description: 'cook dinner', done: false },
				{ id: 2, description: 'buy something', done: true },
				{ id: 3, description: 'have a rest', done: true },
			],
		} as IVueState;
	},
	//类似于计算属性,在组件端暴露为store.getters
	//访问方式:store.getters.doneTodos,store.getters.doneTodosCount
	//对于模块内部的 getter，根节点状态rootState会作为第三个参数暴露出来：
	//所以,参数列表是:(state,getters,rootState)
	getters: {
		doneTodos: (stt: IVueState) => {
			return stt.todos.filter(todo => todo.done);
		},
		//Getter 也可以接受其他 getter 作为第二个参数,以便调用其他getter
		doneTodosCount: (stt, getters: GetterTree<IVueState, IVueState>, ...rest) => {
			return getters.doneTodos.length;
		},

		//通过让 getter 返回一个函数，来实现给 getter 传参。
		//在你对 store 里的数组进行查询时非常有用。
		getTodoById: (stt: IVueState) => (id: number) => {
			return stt.todos.find(todo => todo.id === id);
		},

		/**
		 * getter参数模板
		 * @param rest 按从左到右的顺序为
		 * 		局部state(proxy) 
		 * 		局部getters(object)
		 * 		根节点rootState(proxy)
		 * 		根节点rootGetters(object)
		 * @returns any
		 * @comment 对于不同的层级,可能存在 state=rootState getters=rootGetters
		 */
		examGetA: (...rest): TrialUnit => {
			return {
				description: 'example getter A',
				args: rest,
			} as TrialUnit;
		},

	},
	//这个选项更像是事件注册：“当触发一个类型为 increment 的 mutation 时，调用此函数
	//注意:Mutation 必须是同步函数
	mutations: {
		/**测试参数
		 * mutation参数模板
		 * @param rest 
		 * 		局部state(proxy)
		 * 		调用端附加的参数对象(如果有)
		 * 		后续如果有则被忽略
		 */
		examMutaA: (...rest): void => {
			//			console.clear();
			console.log('examMutaA raised:', rest);
		},


		[INCREMENT](state: IVueState) {
			state.count++;
		},
		//可以向 store.commit 传入额外的参数，即 mutation 的载荷（payload）
		[ADD_COUNT](state: IVueState, payload: number, ...rest) {
			state.count += payload;
		},

		[ADD_TODO](state: IVueState, payload: Todo) {
			state.todos.push(payload);
		},

		[ADD_USING_OBJECT_STYLE](state: IVueState, payload: Payload) {
			if (payload.amount) {
				state.count += payload.amount;
			}
			if (payload.todo) {
				state.todos.push(payload.todo);
			}
		},

		[REVERSE](state: IVueState) {
			state.utterance = state.utterance.split('').reverse().join("");
		},

		_updateUtterance(state: IVueState, words: string) {
			state.utterance = words;
		},
		_getCount(state: IVueState, obj: any) {
			//	return state.count;	//无法直接获取
			obj.data = state.count;
		}

	},
	//Action 提交的是 mutation，而不是直接变更状态。
	//Action 可以包含任意异步操作。
	//Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象,但它又不是store实例本身
	//局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState
	//故必要时,采用解构形式{state,commit,rootState}
	actions: {
		/**
		 * action参数模板
		 * @param context:上下文对象,包含以下字段:
		 *         	commit: function
		 *					dispatch: function
		 *					getters: object, 当前层级的getters(上层包括下层) 
		 *					rootGetters: object, 根节点getters
		 *					state: Proxy, 当前层级的state
		 *					rootState: Proxy, 根节点的state
		 * @param payload:实验用的载荷对象
		 * @param rest: 其余参数(Options?: DispatchOptions | undefined),
		 *				标识是否访问根节点的action, 只在模块内使用有效
		 * @returns void
		 */
		examActA(context: ActionContext<any, any>, payload: ExamPayload, ...rest) {
			//console.clear();
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					context.commit("examMutaA", payload, ...rest);
					resolve({
						description: "examActA resolve for promise.",
						args: [context, payload, rest]
					} as TrialUnit);
				}, payload.msDelay);
			})
		},

		//测试重名action,mutation的模块(全局和局部),内部,外部调用的细节,结论参见moduleC.ts.	
		sameNameAct(context: ActionContext<any, any>, payload: ExamPayload, ...rest) {
			console.log('sameNameAct of moduleA.ts called.');
		},
		anotherAct1(context: ActionContext<any, any>, payload: ExamPayload, ...rest) {
			console.log('anotherAct of moduleA.ts called,call sameNameAct');
			context.dispatch("sameNameAct");
		},
		anotherAct2(context: ActionContext<any, any>, payload: ExamPayload, ...rest) {
			console.log('anotherAct2 of moduleA.ts called,call sameNameAct');
			context.dispatch("sameNameAct", null, { root: payload?.nextCallRoot });
		},



		//借用Mutation的事件名称作为action的事件名
		[INCREMENT]({ commit }) {
			commit(INCREMENT);
		},

		//或采用参数结构简化代码:{commit},特别是我们需要调用
		//commit 很多次的时候, 但无法在状态分模块时实施
		[REVERSE]({ commit }) {
			commit(REVERSE);
		},

		//action可以执行异步操作
		incrementAsync({ commit: cmt }) {
			setTimeout(() => {
				cmt(INCREMENT);
			}, 1000);
		},
		addCountAsync({ commit }, payload: number) {
			setTimeout(() => {
				commit(ADD_COUNT, payload);
			}, 1200);
		},
		addUsingObjectStyleAsync({ commit }, payload: Payload) {
			setTimeout(() => {
				commit(ADD_USING_OBJECT_STYLE, payload);
			}, 1300);
		},
		//dispatch的返回值实验
		actionA({ commit }, ...rest) {
			return new Promise(resolve => {
				setTimeout(() => {
					commit(INCREMENT);
					const obj = {
						data: undefined,
					};
					commit("_getCount", obj);
					resolve(`congratulations,you win! Current count is ${obj.data}`);
				}, 1400);
			});
		},
		//嵌套action
		async actionB({ commit, dispatch }) {
			const resp = await dispatch('actionA');
			commit(REVERSE);
			return new Promise(resolve => {
				setTimeout(() => {
					//		this.state.utterance = resp;
					commit('_updateUtterance', resp);
					resolve('ok ok');
				}, 1200);
			});
		},
	},
} as StoreOptions<IVueState>;
