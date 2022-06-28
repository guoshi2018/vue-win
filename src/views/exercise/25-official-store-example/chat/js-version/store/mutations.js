import { js_chat } from "../../../const";

export default {
  [js_chat.mutation.receiveAll](state, messages) {
    let latestMessage
    messages.forEach(message => {
      // create new thread if the thread doesn't exist
      if (!state.threads[message.threadID]) {
        createThread(state, message.threadID, message.threadName)
      }
      // mark the latest message
      if (!latestMessage || message.timestamp > latestMessage.timestamp) {
        latestMessage = message
      }
      // add message
      addMessage(state, message)
    })

    setAllThreadLastMessages(state);

    // set initial thread to the one with the latest message
    setCurrentThread(state, latestMessage.threadID)
  },

  [js_chat.mutation.receiveMessage](state, message) {
    const thread = addMessage(state, message)
    thread.lastMessage = message;
  },

  [js_chat.mutation.switchThread](state, id) {
    setCurrentThread(state, id)
  }
}

function createThread(state, id, name) {
  // state.threads = {
  //   ...state.threads,
  //   [id]: {
  //     id,
  //     name,
  //     messages: [],
  //     lastMessage: null
  //   }
  // }
  Object.assign(state.threads, {
    [id]: {
      id,
      name,
      messages: [],
      lastMessage: null,
    },
  });
}

//original
//返回消息所属的线程thread
function addMessage(state, message) {
  // add a `isRead` field before adding the message
  message.isRead = message.threadID === state.currentThreadID
  // add it to the thread it belongs to
  const thread = state.threads[message.threadID]
  if (thread && !thread.messages.some(id => id === message.id)) {
    thread.messages.push(message.id)

    //将最后添加进来的消息,作为lastMessage,似乎有点武断,应该以时间戳判断,故已注释
    //   thread.lastMessage = message 
  }
  // add it to the messages map
  // state.messages = {
  //   ...state.messages,
  //   [message.id]: message
  // }
  Object.assign(state.messages, {
    [message.id]: message,
  });
  return thread;
}

function setAllThreadLastMessages({ threads, messages }) {
  Object.values(threads).forEach(th => {
    if (th.messages.length) {
      const id = th.messages.reduce((newlyId, currId) => {
        if (messages[newlyId].timestamp < messages[currId].timestamp) {
          return currId;
        }
        return newlyId;
      }, th.messages[0]);
      th.lastMessage = messages[id];
    }
  });
}




function setCurrentThread(state, id) {
  state.currentThreadID = id
  if (!state.threads[id]) {
    // debugger
  }
  // mark thread as read
  state.threads[id].lastMessage.isRead = true
}
