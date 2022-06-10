//局部模块示范

import { ActionContext, GetterTree, StoreOptions, Module, MutationTree, ActionTree } from 'vuex'

export default {
	namespaced: true,
	state() {
		return {
			name: 'Calinue',
			country: Guoshi.Enums.Country.Canada,
			books: [
				{ id: "cn-001", name: "aaaaa", publishTime: new Date(1927, 10, 1), price: 78 },
				{ id: "cn-002", name: "kkkkk", publishTime: new Date(1987, 9, 13), price: 148 },
				{ id: "cn-003", name: "eeeee", publishTime: new Date(2021, 12, 21), price: 298 },
				{ id: "cn-004", name: "ddddd", publishTime: new Date(1989, 5, 19), price: 178 },
			],
		} as Guoshi.Types.Author;
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
		examGetC: (...rest): Guoshi.Types.TrialUnit => {
			return {
				description: 'example getter C',
				args: rest,
			} as Guoshi.Types.TrialUnit;
		},

	} as GetterTree<Guoshi.Types.Author, Guoshi.Types.Student>,

	mutations: {
		/**测试参数
		 * mutation参数模板
		 * @param rest 
		 * 		局部state(proxy)
		 * 		调用端附加的参数对象(如果有)
		 * 		后续如果有则被忽略
		 */
		examMutaC: (...rest): void => {
			//		console.clear();
			console.log('examMutaC raised:', rest);
		},
	} as MutationTree<Guoshi.Types.Author>,

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
		examActC(context, payload: Guoshi.Types.ExamPayload, ...rest) {
			//console.clear();
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					context.commit("examMutaC", payload);
					resolve({
						description: "examActC resolve for promise.",
						args: [context, payload, rest]
					} as Guoshi.Types.TrialUnit);
				}, payload.msDelay);
			})
		},

		//测试重名action,mutation的模块(全局和局部),内部,外部调用的细节,结论:
		/*
		结论:(注意如果在action内commit mutation,原理以此相同)
			1)客户端调用: 以完整名字区分action, 多个重名action则从根部依次调用
			2)根模块或全局模块的内部调用: 不论DispatchOptions的root如何设置, 
		重名action仍然从根部依次调用
			3)局部模块的内部调用: 根据DispatchOptions的root设置, 重名模块只调用
		局部模块本身的或只调用全局的.注意如果调用全局的, 则全局的所有重名action
		仍然从根部依次调用 
		*/
		sameNameAct(context, payload: Guoshi.Types.ExamPayload, ...rest) {
			console.log('sameNameAct of moduleC.ts called.');
		},
		anotherAct1(context, payload: Guoshi.Types.ExamPayload, ...rest) {
			console.log('anotherAct of moduleC.ts called,call sameNameAct');
			context.dispatch("sameNameAct");
		},
		anotherAct2(context, payload: Guoshi.Types.ExamPayload, ...rest) {
			console.log('anotherAct2 of moduleC.ts called,call sameNameAct');
			context.dispatch("sameNameAct", null, { root: payload?.nextCallRoot });
		},

		/**
		 * 在带命名空间的模块注册全局 action,将action的定义,从方法,变成对象:
		 */
		globalActionOnModC: {
			root: true,
			handler(namespacedContext, payload, ...rest) {
				//console.clear();
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						namespacedContext.commit("examMutaC", payload, ...rest); //仍然调用的是局部模块
						resolve({
							description: "globalActionOnModC resolve for promise.",
							args: [namespacedContext, payload, rest]
						} as Guoshi.Types.TrialUnit);
					}, payload.msDelay);
				})
			}
		},
	} as ActionTree<Guoshi.Types.Author, Guoshi.Types.Student>,
} as Module<Guoshi.Types.Author, Guoshi.Types.Student>;
