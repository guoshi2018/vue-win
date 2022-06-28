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

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { stores } from "../../../store-helper";
import { hot_counter } from "../../../const";
import { studentAsTopstoreKey } from "@/store/setup";

export default defineComponent({
  setup() {
    const store = useStore(studentAsTopstoreKey);

    return {
      count: computed(
        () =>
          store.getters[`${stores.js_hot_count.ns}/${hot_counter.getter.currentCount}`]
      ),
      recentHistory: computed(
        () =>
          store.getters[`${stores.js_hot_count.ns}/${hot_counter.getter.recentHistory}`]
      ),
      increment: () =>
        store.dispatch(`${stores.js_hot_count.ns}/${hot_counter.action.increment}`),
      decrement: () =>
        store.dispatch(`${stores.js_hot_count.ns}/${hot_counter.action.decrement}`),
      incrementIfOdd: () =>
        store.dispatch(`${stores.js_hot_count.ns}/${hot_counter.action.incrementIfOdd}`),
      incrementAsync: () =>
        store.dispatch(`${stores.js_hot_count.ns}/${hot_counter.action.incrementAsync}`),
    };
  },
});
</script>
