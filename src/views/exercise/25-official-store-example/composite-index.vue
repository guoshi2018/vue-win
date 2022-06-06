<template>
  <store-exhibit></store-exhibit>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { defineComponent, onUnmounted, onDeactivated } from "vue";
import { useStore } from "vuex";
import StoreExhibit from "./store-exhibit.vue";

/**
 * 各个子store模块的名称集合
 */
import { regAll, unregAll, stores } from "./store-helper";
import { js_chat, ts_chat } from "./const";

export default defineComponent({
  components: {
    StoreExhibit,
  },
  setup() {
    const store = useStore();
    regAll(store);

    store.dispatch(`${stores.js_chat.ns}/${js_chat.action.getAllMessages}`);
    store.dispatch(`${stores.ts_chat.ns}/${ts_chat.action.init}`);

    store.dispatch(`JsShoppingCart/products/getAllProducts`);
    onDeactivated(() => {
      unregAll(store);
    });
  },
});
</script>
