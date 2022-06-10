//import { Student } from@/store/types.tsbakes';
//import { Guoshi.Types.LoadingState } from './load-type.tsbak';

import { ActionTree, GetterTree, Module, MutationTree } from "vuex"
import LoadingStoreConst from "./const";




/**
 * @description 管理数据加载(上传,下载)的进度画面
 */
export default {
	//namespaced: true,//注册为全局还是局部,由注册时指定,默认为全局
	state: () => {
		return {
			loadingReqs: 0,
		} as Guoshi.Types.LoadingState;
	},
	actions: {} as ActionTree<Guoshi.Types.LoadingState, Guoshi.Types.Student>,
	mutations: {
		[LoadingStoreConst.conduct.mutations.startLoading]: (state) => {
			state.loadingReqs++;
		},
		[LoadingStoreConst.conduct.mutations.endLoading]: (state) => {
			state.loadingReqs--;
		}
	} as MutationTree<Guoshi.Types.LoadingState>,
	getters: {
		[LoadingStoreConst.conduct.getters.requests]: state => state.loadingReqs,
	} as GetterTree<Guoshi.Types.LoadingState, Guoshi.Types.Student>,
} as Module<Guoshi.Types.LoadingState, Guoshi.Types.Student>;


