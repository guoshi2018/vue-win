//import { js_chat } from "../../../const";

//由于各getter之间存在互相调用, 无法以 export default {} 形式导出

const threads = function (state) {
  return state.threads;
};
const currentThread = state => {
  return state.currentThreadID
    ? state.threads[state.currentThreadID]
    : {};
};
const currentMessages = state => {
  const thread = currentThread(state)
  return thread.messages
    ? thread.messages.map(id => state.messages[id])
    : []
};
const unreadCount = ({ threads }) => {
  return Object.values(threads).reduce((count, th) => {
    return th.lastMessage.isRead ? count : count + 1
  }, 0);
};
const sortedMessages = (state, getters) => {
  const messages = currentMessages(state);
  return messages.slice().sort((a, b) => a.timestamp - b.timestamp)

};

export {
  threads, currentThread, currentMessages, unreadCount, sortedMessages
}




