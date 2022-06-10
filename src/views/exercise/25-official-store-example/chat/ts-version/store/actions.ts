
import { ActionTree } from 'vuex';
import ChatState from '../api/ChatState.class';
import { ts_chat } from '../../../const';
import api from '../api/network';
import { ChatMessageOptions } from '../api/options';

//严格模式下,state的操作(即状态的改变),只能放在mutation中,否则将引发错误
export default {
  [ts_chat.action.init]: async ({ state, commit }) => {
    const msgOpts = await api.messageOptionsFromServer()
    commit(ts_chat.mutation.saveAsMessages, msgOpts);
    commit(ts_chat.mutation.setCurrentThread, state.newestThread);
    //console.log('data ready!');
  },

  [ts_chat.action.saveMessageOptions]: async ({ state, commit }, msgOpt: ChatMessageOptions) => {
    commit(ts_chat.mutation.saveAsMessage, msgOpt);
    api.messageOptionsToServer(msgOpt);
  }
} as ActionTree<ChatState, Guoshi.Types.Student>;


//api.uploadWebMessages(msgOpt);