//namespaced未设置,为默认的全局模块

import { ActionContext, GetterTree, MutationTree, ActionTree, Module } from 'vuex'

export default {
	namespaced: false,
	state() {
		return {
			count: 101,
			utterance: 'hello,world中国共产党,congratulations',
			todos: [
				{ id: 1, description: 'cook dinner', done: false },
				{ id: 2, description: 'buy something', done: true },
				{ id: 3, description: 'have a rest', done: true },
			],
		} as Guoshi.Intfs.IVueState;
	},
	//类似于计算属性,在组件端暴露为store.getters
	//访问方式:store.getters.doneTodos,store.getters.doneTodosCount
	//对于模块内部的 getter，根节点状态rootState会作为第三个参数暴露出来：
	//所以,参数列表是:(state,getters,rootState)
	getters: {
		doneTodos: stt => {
			return stt.todos.filter(todo => todo.done);
		},
		//Getter 也可以接受其他 getter 作为第二个参数,以便调用其他getter
		doneTodosCount: (stt, getters, ...rest) => {
			return getters.doneTodos.length;
		},

		//通过让 getter 返回一个函数，来实现给 getter 传参。
		//在你对 store 里的数组进行查询时非常有用。
		getTodoById: stt => (id: number) => {
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
		examGetA: (...rest) => {
			return {
				description: 'example getter A',
				args: rest,
			} as Guoshi.Types.TrialUnit;
		},

	} as GetterTree<Guoshi.Intfs.IVueState, Guoshi.Types.Student>,

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


		[Guoshi.Consts.INCREMENT](state) {
			state.count++;
		},
		//可以向 store.commit 传入额外的参数，即 mutation 的载荷（payload）
		[Guoshi.Consts.ADD_COUNT](state, payload: number, ...rest) {
			state.count += payload;
		},

		[Guoshi.Consts.ADD_TODO](state, payload: Guoshi.Types.Todo) {
			state.todos.push(payload);
		},

		[Guoshi.Consts.ADD_USING_OBJECT_STYLE](state, payload: Guoshi.Types.Payload) {
			if (payload.amount) {
				state.count += payload.amount;
			}
			if (payload.todo) {
				state.todos.push(payload.todo);
			}
		},

		[Guoshi.Consts.REVERSE](state) {
			state.utterance = state.utterance.split('').reverse().join("");
		},

		[Guoshi.Consts.UPDATE_UTTERANCE](state, newUtt: string) {
			state.utterance = newUtt;
		},

		_getCount(state, obj: any) {
			//	return state.count;	//无法直接获取
			obj.data = state.count;
		}

	} as MutationTree<Guoshi.Intfs.IVueState>,
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
		examActA(context, payload: Guoshi.Types.ExamPayload, ...rest) {
			//console.clear();
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					context.commit("examMutaA", payload, ...rest);
					resolve({
						description: "examActA resolve for promise.",
						args: [context, payload, rest]
					} as Guoshi.Types.TrialUnit);
				}, payload.msDelay);
			})
		},

		//测试重名action,mutation的模块(全局和局部),内部,外部调用的细节,结论参见moduleC.ts.	
		sameNameAct(context, payload: Guoshi.Types.ExamPayload, ...rest) {
			console.log('sameNameAct of moduleA.ts called.');
		},
		anotherAct1(context, payload: Guoshi.Types.ExamPayload, ...rest) {
			console.log('anotherAct of moduleA.ts called,call sameNameAct');
			context.dispatch("sameNameAct");
		},
		anotherAct2(context, payload: Guoshi.Types.ExamPayload, ...rest) {
			console.log('anotherAct2 of moduleA.ts called,call sameNameAct');
			context.dispatch("sameNameAct", null, { root: payload?.nextCallRoot });
		},
		//借用Mutation的事件名称作为action的事件名
		[Guoshi.Consts.INCREMENT]({ commit }) {
			commit(Guoshi.Consts.INCREMENT);
		},

		//或采用参数结构简化代码:{commit},特别是我们需要调用
		//commit 很多次的时候, 但无法在状态分模块时实施
		[Guoshi.Consts.REVERSE]({ commit }) {
			commit(Guoshi.Consts.REVERSE);
		},

		//action可以执行异步操作
		incrementAsync({ commit: cmt }) { // : 在此用来表示别名 
			setTimeout(() => {
				cmt(Guoshi.Consts.INCREMENT);
			}, 1000);
		},
		addCountAsync({ commit }, payload: number) {
			setTimeout(() => {
				commit(Guoshi.Consts.ADD_COUNT, payload);
			}, 1200);
		},
		addUsingObjectStyleAsync({ commit }, payload: Guoshi.Types.Payload) {
			setTimeout(() => {
				commit(Guoshi.Consts.ADD_USING_OBJECT_STYLE, payload);
			}, 1300);
		},
		//dispatch的返回值实验
		actionA({ commit }, ...rest) {
			return new Promise(resolve => {
				setTimeout(() => {
					commit(Guoshi.Consts.INCREMENT);
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
			commit(Guoshi.Consts.REVERSE);
			return new Promise(resolve => {
				setTimeout(() => {
					//		this.state.utterance = resp;
					commit(Guoshi.Consts.UPDATE_UTTERANCE, resp);
					resolve('ok ok');
				}, 1200);
			});
		},
	} as ActionTree<Guoshi.Intfs.IVueState, Guoshi.Types.Student>,
} as Module<Guoshi.Intfs.IVueState, Guoshi.Types.Student>;
