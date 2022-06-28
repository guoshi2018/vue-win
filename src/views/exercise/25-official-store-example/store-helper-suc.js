
//import { Store } from "vuex";
//import * as counter from "./counter/const";

//import store_jschat from "@/views/exercise/25-official-store-example/chat/js-version/store";
//import store_tschat from "@/views/exercise/25-official-store-example/chat/ts-version/store";
//import store_jscounter from "./counter/js-version/store";
//import store_tscounter from "./counter/ts-version/store";

// type tinyStore = {
// 	ns: string;
// 	module: any;
// };

// 在此添加示例程序的store的导入, 再在stores对象添加对应子对象即可.
import js_chat_store from "./chat/js-version/store";
import ts_chat_store from "./chat/ts-version/store";
import js_counter_store from "./counter/js-version/store";
import ts_counter_store from "./counter/ts-version/store";

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
		module: js_chat_store, //store_jschat,		
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
		module: ts_chat_store,
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
		module: js_counter_store,
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
		module: ts_counter_store,
	},
};

/**
 * 注册所有登记在案的store模块
 * @param parentStore :Store 所有模块都作为此store的一级私有子模块
 */
const regAll = (parentStore) => {
	for (const p in stores) {
		const obj = stores[p];
		if (!parentStore.hasModule(obj.ns)) {
			si.module.namespaced = true;
			parentStore.registerModule(obj.ns, obj.module);
		}
	}
	//print(debug,'.........', parentStore);
};
/**
 * 注销所有被注册的store模块
 * @param parentStore:Store 针对此模块的一级子模块
 */
const unregAll = parentStore => {
	for (const p in stores) {
		const obj = stores[p];
		parentStore.unregisterModule(obj.ns);
	}
};
/**
 * 包含子store模块的注册,反注册方法,一级准备注册作为私有模块的store
 * 注意这些store不能使用createStore创建,而仅仅是storeOptions
 */
export {
	regAll, unregAll, stores
};


