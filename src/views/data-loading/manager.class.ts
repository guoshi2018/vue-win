
import { Store, useStore } from "vuex";
import LoadingStoreConst from "./const";
import { print } from "@/common/mixins/func";
import { studentAsTopstoreKey } from "@/store/setup";
const debug = false;


export default class LoadingStateManager {

	private _store?: Store<any>;
	private static _instance: LoadingStateManager;
	/**
	 * Singleton模式
	 * @returns 获取唯一的LoadingStateManager实例
	 */
	public static getInstance(): LoadingStateManager {
		if (!LoadingStateManager._instance) {
			//print(debug,'new Manager..........');
			LoadingStateManager._instance = new LoadingStateManager();
		}
		return LoadingStateManager._instance;
	}

	private constructor() { }

	/**
	 * 加载数据开始, 显示加载画面.
	 * @param dbgHint 需要在控制台打印的提示消息 
	 */
	public loading(dbgHint?: string): void {
		this._process(LoadingStoreConst.conduct.mutations.startLoading, dbgHint);
	}
	/**
	 * 加载数据结束, 隐藏加载画面
	 * @param dbgHint 需要在控制台打印的提示消息
	 */
	public loaded(dbgHint?: string): void {
		this._process(LoadingStoreConst.conduct.mutations.endLoading, dbgHint);
	}

	private _process(startOrEnd: string, dbgHint?: string) {
		this._store = this._store || useStore(studentAsTopstoreKey); //太早,useStore可能返回undefined
		print(debug, 'in data-loading-manager, store is ', this._store);
		if (this._store) {
			dbgHint && print(debug, dbgHint);
			this._store.commit(`${LoadingStoreConst.path}/${startOrEnd}`);
			// dbgHint && print(debug,'current showing loading-data requests:', this._store.getters[
			// 	`${LoadingStoreConst.path}/${LoadingStoreConst.conduct.getters.requests}`
			// ]);
		}
	}
}
