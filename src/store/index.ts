
/*
重要:
	store只有一个,子模块只能具有状态,他的action mutations等均为全局
	在组合式API里,获取store的方法: 
		1. const store = useStore()
		2. const store = this.$store
	在此基础上,获取moduleA的状态集:
		store.state.first
	在其state()下声明有属性,例如 a,b,c.
*/

import { ActionContext, createStore, StoreOptions } from 'vuex'
import { IVueState, Student, TrialUnit, ExamPayload } from './types';
import Ma from './moduleA';
import Mb from './moduleB';
import Mc from './moduleC';

export default createStore({
	state() {
		return {
			name: 'billgates',
			age: 58,
		} as Student;
	},
	getters: {
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
		examGetRoot: (...rest): TrialUnit => {
			return {
				description: 'example getter Root,top lever,inner Store',
				args: rest,
			} as TrialUnit;
		},
	},

	mutations: {
		/**mutation参数模板 
		 * mutation参数模板
		 * @param rest 按从左到右的顺序为
		 * 		局部state(proxy)
		 * 		调用端附加的参数对象(如果有)
		 * 		后续如果有则被忽略
		 * @returns void
		 */
		examMutaRoot: (...rest): void => {
			//		console.clear();
			console.log('examMutaRoot raised:', rest);
		},
	},

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
		 *				标识是否访问根节点的action,只在模块内使用有效
		 * @returns void
		 */
		examActRoot(context: ActionContext<any, any>, payload: ExamPayload, ...rest) {
			//console.clear();
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					context.commit("examMutaRoot", payload, ...rest);
					resolve({
						description: "examActRoot resolve for promise.",
						args: [context, payload, rest]
					} as TrialUnit);
				}, payload.msDelay);
			})
		},

		//测试重名action,mutation的模块(全局和局部),内部,外部调用的细节,结论参见moduleC.ts.	
		sameNameAct(context: ActionContext<any, any>, payload: ExamPayload, ...rest) {
			console.log('sameNameAct of root called.');
		},
	},


	modules: {
		ModA: Ma as StoreOptions<any>,
		ModB: Mb as StoreOptions<any>,
		//	ModC: Mc as StoreOptions<any>, //重复注册ModC
	}
});
