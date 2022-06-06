import { Count } from 'target-vue/count';

import { MutationTree, GetterTree, ActionTree, Module } from 'vuex'
import { CountState } from './types';

import { counter } from '../../const';

// root state object.
// each Vuex instance is just a single state tree.
const state = (): CountState => {
  return {
    count: 0,
  };
}

// mutations are operations that actually mutate the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  [counter.mutation.increment](state) {
    state.count++
  },
  [counter.mutation.decrement](state) {
    state.count--
  }
} as MutationTree<CountState>;

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  [counter.action.increment]: ({ commit }) => commit(counter.mutation.increment),
  [counter.action.decrement]: ({ commit }) => commit(counter.mutation.decrement),
  [counter.action.incrementIfOdd]({ commit, state }) {
    if ((state.count + 1) % 2 === 0) {
      commit(counter.mutation.increment)
    }
  },
  [counter.action.incrementAsync]({ commit }): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit(counter.mutation.increment)
        resolve();
      }, 1000)
    })
  }
} as ActionTree<CountState, any>;

// getters are functions.
const getters = {
  [counter.getter.evenOrOdd]: state => state.count % 2 === 0 ? 'even' : 'odd',
  [counter.getter.currentCount]: state => state.count,
} as GetterTree<CountState, any>;

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default {
  //namespaced: false, //在store-helper中已经强制其为true
  state,
  getters,
  actions,
  mutations
} as Module<CountState, any>;
