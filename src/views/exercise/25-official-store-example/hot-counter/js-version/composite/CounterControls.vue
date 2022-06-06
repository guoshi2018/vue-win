<template>
  <div>
    Value: {{ count }}
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">Increment if odd</button>
    <button @click="incrementAsync">Increment async</button>
    <div>
      <div>Recent History (last 5 entries): {{ recentHistory }}</div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { stores } from "../../../store-helper";
import { hot_counter } from "../../../const";

export default {
  setup() {
    const store = useStore();

    return {
      count: computed(
        () =>
          store.getters[
            `${stores.js_hot_count.ns}/${hot_counter.getter.currentCount}`
          ]
      ),
      recentHistory: computed(
        () =>
          store.getters[
            `${stores.js_hot_count.ns}/${hot_counter.getter.recentHistory}`
          ]
      ),
      increment: () =>
        store.dispatch(
          `${stores.js_hot_count.ns}/${hot_counter.action.increment}`
        ),
      decrement: () =>
        store.dispatch(
          `${stores.js_hot_count.ns}/${hot_counter.action.decrement}`
        ),
      incrementIfOdd: () =>
        store.dispatch(
          `${stores.js_hot_count.ns}/${hot_counter.action.incrementIfOdd}`
        ),
      incrementAsync: () =>
        store.dispatch(
          `${stores.js_hot_count.ns}/${hot_counter.action.incrementAsync}`
        ),
    };
  },
};
</script>
