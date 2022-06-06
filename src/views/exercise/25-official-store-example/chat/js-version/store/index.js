import { createLogger, } from 'vuex'
import * as getters from './getters'
import actions from './actions'
import mutations from './mutations'


//作为子模块添加,就不能使用createStore方法
export default {
  namespaced: true,
  state() {
    return {
      currentThreadID: null,
      threads: {
        /*
    id: {
      id,
      name,
      messages: [...ids],
      lastMessage
    }
    */
      },
      messages: {
        /*
id: {
  id,
  threadId,
  threadName,
  authorName,
  text,
  timestamp,
  isRead
}
*/
      },
    };
  },
  getters,
  actions,
  mutations,
  plugins: process.env.NODE_ENV !== 'production'
    ? [createLogger()]
    : []
};
