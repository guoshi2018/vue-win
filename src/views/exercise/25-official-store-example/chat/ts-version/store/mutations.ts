import { MutationTree } from "vuex";
import ChatState from '../api/ChatState.class';
import { ChatMessageOptions } from "../api/options";
import ChatThread from '../api/ChatThread.class';
import { ts_chat } from '../../../const';

//严格模式下,state的操作(即状态的改变),只能放在mutation中,否则将引发错误
export default {
  /**
   * 保存消息
   * @param state ChatState对象
   * @param msgOpt 消息选项
  */
  [ts_chat.mutation.saveAsMessage](state, msgOpt: ChatMessageOptions) {
    state.saveAsMessage(msgOpt);
  },

  [ts_chat.mutation.setCurrentThread](state, val: ChatThread | string) {
    state.setCurrentThread(val);
  },

  [ts_chat.mutation.saveAsMessages](state, msgOpts: ChatMessageOptions[]) {
    state.empty();
    state.saveAsMessages(msgOpts);
  }

} as MutationTree<ChatState>;