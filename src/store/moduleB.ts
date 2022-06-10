//局部模块示范
import { ActionContext, GetterTree, StoreOptions, Module, MutationTree, ActionTree } from 'vuex'
import Mc from './moduleC';

export default {
	//使其成为带命名空间的模块,当模块被注册后，它的所有
	//getter、action 及 mutation 都会自动根据模块注册的路径调整命名
	//格式是 /模块名/子模块名/.../getter(或者action,mutation)名
	//子模块仍然可以决定是开创自己的命名空间,还是沿用父模块的命名空间,
	//默认值为false,即沿用父模块的命名空间
	//但模块内部使用不需要(也不应该)额外添加命名空间前缀
	namespaced: true,
	state() {
		return {
			nickName: 'Newton',
			isVip: true,
			joinTime: new Date(1956, 12, 25, 14, 23, 18),
			wifes: [
				{ name: "sarqier", country: Guoshi.Enums.Country.Australia, birth: new Date(2002, 8, 13, 7), salary: 4339 },
				{ name: "xiamili", coutry: Guoshi.Enums.Country.Canada, birth: new Date(1998, 5, 11, 23), salary: 7419 },
				{ name: "wangzhaojun", coutry: Guoshi.Enums.Country.Koria, birth: new Date(2005, 11, 11, 21), salary: 39181 },
			],
		} as Guoshi.Types.UserInfo;
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
		examGetB: (...rest): Guoshi.Types.TrialUnit => {
			return {
				description: 'example getter B',
				args: rest,
			} as Guoshi.Types.TrialUnit;
		},

	} as GetterTree<Guoshi.Types.UserInfo, Guoshi.Types.Student>,

	mutations: {

		/**测试参数
		 * mutation参数模板
		 * @param rest 
		 * 		局部state(proxy)
		 * 		调用端附加的参数对象(如果有)
		 * 		后续如果有则被忽略
		 */
		examMutaB: (...rest): void => {
			//			console.clear();
			console.log('examMutaB raised:', rest);
		},
	} as MutationTree<Guoshi.Types.UserInfo>,

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
		examActB(context, payload: Guoshi.Types.ExamPayload, ...rest) {
			//console.clear();
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					context.commit("examMutaB", payload, ...rest);
					resolve({
						description: "examActB resolve for promise.",
						args: [context, payload, rest]
					} as Guoshi.Types.TrialUnit);
				}, payload.msDelay);
			})
		},

		//测试重名action,mutation的模块(全局和局部),内部,外部调用的细节,结论参见moduleC.ts.	
		sameNameAct(context, payload: Guoshi.Types.ExamPayload, ...rest) {
			console.log('examActB2 of moduleB.ts called.');
		}
	} as ActionTree<Guoshi.Types.UserInfo, Guoshi.Types.Student>,
	modules: {
		ModC: Mc as Module<Guoshi.Types.Author, Guoshi.Types.Student>,
	}
} as Module<Guoshi.Types.UserInfo, Guoshi.Types.Student>;
