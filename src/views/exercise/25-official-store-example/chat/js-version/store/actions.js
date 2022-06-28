import * as api from '../api'
import { js_chat } from '../../../const';

export default {
  [js_chat.action.getAllMessages]: ({ commit }) => {
    api.getAllMessages(messages => {
      commit('receiveAll', messages)
    })
  },
  [js_chat.action.sendMessage]: ({ commit }, payload) => {
    api.createMessage(payload, message => {
      commit('receiveMessage', message)
    })
  },
  [js_chat.action.switchThread]: ({ commit }, payload) => {
    //  print(debug,'...........', payload);
    commit('switchThread', payload)
  },
}

