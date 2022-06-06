import { hot_counter } from "../../../const"

// export const increment = ({ commit }) => {
//   commit('increment')
// }
// export const decrement = ({ commit }) => {
//   commit('decrement')
// }

// export const incrementIfOdd = ({ commit, state }) => {
//   if ((state.count + 1) % 2 === 0) {
//     commit('increment')
//   }
// }

// export const incrementAsync = ({ commit }) => {
//   setTimeout(() => {
//     commit('increment')
//   }, 1000)
// }

export default {
  [hot_counter.action.increment]: ({ commit }) => {
    commit(hot_counter.mutation.increment);
  },
  [hot_counter.action.decrement]: ({ commit }) => {
    commit(hot_counter.mutation.decrement);
  },
  [hot_counter.action.incrementIfOdd]: ({ commit, state }) => {
    if ((state.count + 1) % 2 === 0) {
      commit(hot_counter.mutation.increment);
    }
  },
  [hot_counter.action.incrementAsync]: ({ commit }) => {
    setTimeout(() => {
      commit(hot_counter.mutation.increment);
    }, 1000)
  },

}
