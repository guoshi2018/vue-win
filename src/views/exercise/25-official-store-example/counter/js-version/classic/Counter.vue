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
import { createNamespacedHelpers } from "vuex";
import { counter } from "../../../const";
import { stores } from "../../../store-helper";
import { defineComponent } from "vue";

const mapHelper = createNamespacedHelpers(stores.js_counter.ns);
export default defineComponent({
  computed: mapHelper.mapGetters({
    currentCount: counter.getter.currentCount,
    evenOrOdd: counter.getter.evenOrOdd,
  }),
  methods: mapHelper.mapActions({
    increment: counter.action.increment,
    decrement: counter.action.decrement,
    incrementAsync: counter.action.incrementAsync,
    incrementIfOdd: counter.action.incrementIfOdd,
  }),
});
</script>
