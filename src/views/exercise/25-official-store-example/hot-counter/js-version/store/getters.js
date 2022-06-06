
import { hot_counter } from '../../../const';


export default {
  [hot_counter.getter.currentCount]: (state) => {
    return state.count;
  },
  [hot_counter.getter.test]: (state) => {
    return state.test
  },
  [hot_counter.getter.recentHistory]: (state) => {
    const end = state.history.length
    const temp = end - hot_counter.other.limit;
    const begin = temp < 0 ? 0 : temp
    return state.history
      .slice(begin, end)
      .join(', ')
  }
}

// export const currentCount = state => state.count

// export const recentHistory = state => {
//   return state.history
//     .slice(-5)
//     .join(', ')
// }



