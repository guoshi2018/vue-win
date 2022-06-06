
import { Store, useStore } from "vuex";
import LoadingStoreConst from "./const";


export default class LoadingStateManager {

	private _store?: Store<any>;
	private static _instance: LoadingStateManager;
	/**
	 * Singleton模式
	 * @returns 获取唯一的LoadingStateManager实例
	 */
	public static getInstance(): LoadingStateManager {
		if (!LoadingStateManager._instance) {
			//console.log('new Manager..........');
			LoadingStateManager._instance = new LoadingStateManager();
		}
		return LoadingStateManager._instance;
	}

	private constructor() { }

	/**
	 * 加载数据开始, 显示加载画面.
	 * @param dbgHint 需要在控制台打印的提示消息 
	 */
	public loading(dbgHint?: string) {
		this._process(LoadingStoreConst.conduct.mutations.startLoading, dbgHint);
	}
	/**
	 * 加载数据结束, 隐藏加载画面
	 * @param dbgHint 需要在控制台打印的提示消息
	 */
	public loaded(dbgHint?: string) {
		this._process(LoadingStoreConst.conduct.mutations.endLoading, dbgHint);
	}

	private _process(startOrEnd: string, dbgHint?: string) {
		this._store = this._store || useStore(); //太早,useStore可能返回undefined
		if (this._store) {
			dbgHint && console.log(dbgHint);
			this._store.commit(`${LoadingStoreConst.path}/${startOrEnd}`);
			// dbgHint && console.log('current showing loading-data requests:', this._store.getters[
			// 	`${LoadingStoreConst.path}/${LoadingStoreConst.conduct.getters.requests}`
			// ]);
		}
	}
}
