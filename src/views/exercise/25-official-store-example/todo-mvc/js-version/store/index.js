import { createStore } from 'vuex'
import { mutations, STORAGE_KEY } from './mutations'
import actions from './actions'
import plugins from './plugins'
import { print } from "@/common/mixins/func";
const debug = true;

const initTodos = () => {
  let tds = [];
  try {
    const t = window.localStorage.getItem(STORAGE_KEY); //可能异常
    tds = JSON.parse(t);
  } catch (err) {
    print(debug, 'init todos failed.then use empty array');
  }
  return tds;
}


export default {
  state: {
    //todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    todos: initTodos(),
  },
  actions,
  mutations,
  plugins
}
