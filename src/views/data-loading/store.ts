import { Student } from '@/store/types';
import { LoadingState } from './load-type';
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
		} as LoadingState;
	},
	actions: {} as ActionTree<LoadingState, Student>,
	mutations: {
		[LoadingStoreConst.conduct.mutations.startLoading]: (state) => {
			state.loadingReqs++;
		},
		[LoadingStoreConst.conduct.mutations.endLoading]: (state) => {
			state.loadingReqs--;
		}
	} as MutationTree<LoadingState>,
	getters: {
		[LoadingStoreConst.conduct.getters.requests]: state => state.loadingReqs,
	} as GetterTree<LoadingState, Student>,
} as Module<LoadingState, Student>;


