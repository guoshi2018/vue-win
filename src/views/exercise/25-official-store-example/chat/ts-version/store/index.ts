import { createLogger, Module } from 'vuex'
import ChatState from '../api/ChatState.class';
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import { Student } from '@/store/types';


//作为子模块添加,就不能使用createStore方法
export default {
	//strict: process.env.NODE_ENV != 'production',
	//strict: false,		//覆盖无效,以根store设置为准. 其实,子模块的该字段设置永远被忽略
	namespaced: true,
	state() {
		return new ChatState();
	},
	getters,
	actions,
	mutations,
	plugins: process.env.NODE_ENV !== 'production'
		? [createLogger()]
		: []
} as Module<ChatState, Student>;
