
import { GetterTree } from "vuex";
import ChatState from "../api/ChatState.class";
import { ts_chat } from '../../../const';

export default {
  [ts_chat.getter.threads]: state => state.threads,

  [ts_chat.getter.threadIds]: state => state.getThreadIds(),

  [ts_chat.getter.currentThread]: state => state.currentThread,

  [ts_chat.getter.currentThreadId]: state => state.currentThread.id,

  [ts_chat.getter.currentMessages]: state => state.currentThread.underMessages,

  [ts_chat.getter.unreadThreadCount]: state => state.unreadThreadCount,

  [ts_chat.getter.sortedMessages]: state => state.sortedCurrentMessages,

} as GetterTree<ChatState, Guoshi.Types.Student>;



