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
import {
	Store,
	createStore,
	StoreOptions,
	Module,
	GetterTree,
	MutationTree,
	ActionTree,
	ModuleTree,
} from "vuex";
import { Guoshi } from "@/common/type/guoshi";
import Ma from "./moduleA";
import Mb from "./moduleB";
import Mc from "./moduleC";
import { print } from "@/common/mixins/func";
const debug = true;

export default createStore({
	/*
		在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，
		将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
		且是全局的.子模块无法覆盖此设置
	*/
	strict: process.env.NODE_ENV != "production",
	state() {
		return {
			name: "billgates",
			age: 58,
		} as Guoshi.Interfaces.Student;
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
		examGetRoot: (...rest): Guoshi.Types.TrialUnit => {
			return {
				description: "example getter Root,top lever,inner Store",
				//	args: rest,
				args: ["args to cyclic, so do not see it", "bye"],
			} as Guoshi.Types.TrialUnit;
		},
	} as GetterTree<Guoshi.Interfaces.Student, Guoshi.Interfaces.Student>, //本级就是根级

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
			print(debug, "examMutaRoot raised:", rest);
		},
	} as MutationTree<Guoshi.Interfaces.Student>,

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
		examActRoot(context, payload: Guoshi.Types.ExamPayload, ...rest) {
			//console.clear();
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					context.commit("examMutaRoot", payload, ...rest);
					resolve({
						description: "examActRoot resolve for promise.",
						args: [context, payload, rest],
					} as Guoshi.Types.TrialUnit);
				}, payload.msDelay);
			});
		},

		//测试重名action,mutation的模块(全局和局部),内部,外部调用的细节,结论参见moduleC.ts.
		sameNameAct(context, payload: Guoshi.Types.Payload, ...rest) {
			print(debug, "sameNameAct of root called.");
		},
	} as ActionTree<Guoshi.Interfaces.Student, Guoshi.Interfaces.Student>,
	modules: {
		modA: Ma as Module<Guoshi.Interfaces.VueState, Guoshi.Interfaces.Student>,
		modB: Mb as Module<Guoshi.Interfaces.UserInfo, Guoshi.Interfaces.Student>, //内部已经注册ModC
		modC: Mc as Module<Guoshi.Interfaces.Author, Guoshi.Interfaces.Student>, //重复注册ModC
	} as ModuleTree<Guoshi.Interfaces.Student>,
	//	plugins,
} as StoreOptions<Guoshi.Interfaces.Student>) as Store<Guoshi.Interfaces.Student>;
