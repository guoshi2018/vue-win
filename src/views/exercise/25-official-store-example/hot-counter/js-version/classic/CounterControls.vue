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
import { defineComponent } from "vue";
import { mapGetters, mapActions, createNamespacedHelpers } from "vuex";
import { stores } from "../../../store-helper";
import { hot_counter } from "../../../const";
import { print, getType } from "@/common/mixins/func";
const debug = true;

const mapHelper = createNamespacedHelpers(stores.js_hot_count.ns);

export default defineComponent({
  created() {
    print(debug, this.$store);
  },
  computed: mapHelper.mapGetters({
    count: hot_counter.getter.currentCount,
    recentHistory: hot_counter.getter.recentHistory,
  }),
  methods: mapHelper.mapActions({
    increment: hot_counter.action.increment,
    decrement: hot_counter.action.decrement,
    incrementIfOdd: hot_counter.action.incrementIfOdd,
    incrementAsync: hot_counter.action.incrementAsync,
  }),
});
</script>
