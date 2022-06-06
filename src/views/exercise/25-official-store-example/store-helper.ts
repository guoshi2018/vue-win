
import { Store } from "vuex";
//import { Student } from "@/store/types";
//import temp from './chat/js-version/store';
// 在此添加示例程序的store的导入.并指定合适的命名空间(不能重名)
// 如果需要将setter/action/mutation的名称集中定义, 还需要到const.ts中配置.
// 注意,常量配置与这里的不需要一致, 但一致却又能提高输入速度和可读性
const stores = {
	/**
	 * jschat store 参数对象
	 */
	js_chat: {
		/**
		 * 命名空间
		 */
		ns: "JsChat",
		/**
		 * 模块import
		 */
		module: require("./chat/js-version/store").default,
		//module: temp,
	},
	/**
	 * tschat store 参数对象
	 */
	ts_chat: {
		/**
		 * 命名空间
		 */
		ns: "TsChat",
		/**
		 * 模块import
		 */
		module: require("./chat/ts-version/store").default,
	},
	/**
	 * jscounter store 参数对象
	 */
	js_counter: {
		/**
		 * 命名空间
		 */
		ns: "JsCounter",
		/**
		 * 模块import
		 */
		module: require("./counter/js-version/store").default,
	},
	// /**
	//  * tscounter store 参数对象
	//  */
	ts_counter: {
		/**
		 * 命名空间
		 */
		ns: "TsCounter",
		/**
		 * 模块import
		 */
		module: require("./counter/ts-version/store").default,
	},
	js_hot_count: {
		ns: "JsHotCounter",
		module: require("./hot-counter/js-version/store").default,
	},
	js_shopping_cart: {
		ns: "JsShoppingCart",
		module: require("./shopping-cart/js-version/store").default,
	},
	js_todo_mvc: {
		ns: "JsTodoMvc",
		module: require("./todo-mvc/js-version/store").default,
	}
};

/**
 * 注册所有登记在案的store模块
 * @param rootStore :Store 所有模块都作为此store的一级私有子模块
 */
const regAll = (rootStore: Store<any>): void => {
	for (const p in stores) {
		//@ts-ignore
		const si = stores[p];
		if (!rootStore.hasModule(si.ns)) {
			si.module.namespaced = true;
			rootStore.registerModule(si.ns, si.module);
		}
	}
	//console.log('.........', rootStore);
};
/**
 * 注销所有被注册的store模块
 * @param rootStore:Store 针对此模块的一级子模块
 */
const unregAll = (rootStore: Store<any>): void => {
	for (const p in stores) {
		//@ts-ignore
		const sj = stores[p];
		rootStore.unregisterModule(sj.ns);
	}
};
/**
 * 包含子store模块的注册,反注册方法,一级准备注册作为私有模块的store
 * 注意这些store不能使用createStore创建,而仅仅是storeOptions
 */
export {
	regAll, unregAll, stores
};


