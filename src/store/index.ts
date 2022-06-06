
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
import { InjectionKey } from 'vue';
import { Store, createStore, useStore as baseUseStore, StoreOptions, Module, GetterTree, MutationTree, ActionTree, ModuleTree } from 'vuex'
import { IVueState, Student, TrialUnit, ExamPayload, UserInfo, Author } from './types';
import Ma from './moduleA';
import Mb from './moduleB';
import Mc from './moduleC';
import plugins from './plugins';

export default createStore({
	/*
		在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，
		将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
		且是全局的.子模块无法覆盖此设置
	*/
	strict: process.env.NODE_ENV != 'production',
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
		 * 注意:对于消费端, getter一般无参; 若需要参数, 只能通过返回函数的方式,见moduleA
		 */
		examGetRoot: (...rest): TrialUnit => {
			return {
				description: 'example getter Root,top lever,inner Store',
				args: rest,
			} as TrialUnit;
		},
	} as GetterTree<Student, Student>, //本级就是根级

	mutations: {
		/**mutation参数模板 
		 * mutation参数模板
		 * @param rest 按从左到右的顺序为
		 * 		局部state(proxy)
		 * 		调用端附加的参数对象(如果有)
		 * 		后续如果有则被忽略
		 * 		因为这相当于消费端引发事件,store响应.
		 * @returns void
		 */
		examMutaRoot: (...rest): void => {
			//		console.clear();
			console.log('examMutaRoot raised:', rest);
		},
	} as MutationTree<Student>,

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
		 * @returns Promise
		 */
		examActRoot(context, payload: ExamPayload, ...rest) {
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
		sameNameAct(context, payload: ExamPayload, ...rest) {
			console.log('sameNameAct of root called.');
		},
	} as ActionTree<Student, Student>,
	modules: {
		ModA: Ma as Module<IVueState, Student>,
		ModB: Mb as Module<UserInfo, Student>,			//内部已经注册ModC
		ModC: Mc as Module<Author, Student>, //重复注册ModC
	} as ModuleTree<Student>,
	//	plugins,
} as StoreOptions<Student>) as Store<Student>;

//自定义useStore组合式函数,使在使用useStore方法时,ts具备类型提示
const key: InjectionKey<Store<Student>> = Symbol();
export function useStore() {
	return baseUseStore(key);
}