<template>
  <div>
    Clicked: {{ currentCount }} times, count is {{ evenOrOdd }}.
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">Increment if odd</button>
    <button @click="incrementAsync">Increment async</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { counter } from "../../const";
import { stores } from "../../store-helper";

export default defineComponent({
  setup() {
    const store = useStore();
    return {
      currentCount: computed(
        (): number =>
          store.getters[
            `${stores.ts_counter.ns}/${counter.getter.currentCount}`
          ]
      ),
      evenOrOdd: computed(
        (): string =>
          store.getters[`${stores.ts_counter.ns}/${counter.getter.evenOrOdd}`]
      ),
      increment: () =>
        store.dispatch(`${stores.ts_counter.ns}/${counter.action.increment}`),
      decrement: () =>
        store.dispatch(`${stores.ts_counter.ns}/${counter.action.decrement}`),
      incrementAsync: () =>
        store.dispatch(
          `${stores.ts_counter.ns}/${counter.action.incrementAsync}`
        ),
      incrementIfOdd: () =>
        store.dispatch(
          `${stores.ts_counter.ns}/${counter.action.incrementIfOdd}`
        ),
    };
  },
});
</script>
