
import { hot_counter } from "../../../const"


export default {
  [hot_counter.mutation.increment]: state => {
    state.count++
    //state.history.push(hot_counter.mutation.increment);
    state.history.push('inc');
  },
  [hot_counter.mutation.decrement]: state => {
    state.count--
    //state.history.push(hot_counter.mutation.decrement);
    state.history.push('dec');
  }
}