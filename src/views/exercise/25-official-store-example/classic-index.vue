<template>
  <store-exhibit></store-exhibit>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { defineComponent } from "vue";
import StoreExhibit from "./store-exhibit.vue";
/**
 * 各个子store模块的名称集合
 */
import { regAll, unregAll, stores } from "./store-helper";
import { js_chat, ts_chat } from "./const";

export default defineComponent({
  components: { StoreExhibit },
  beforeCreate() {
    //注册, 初始化, 其实classic-index.vue和composite-index.vue中, 有一个执行即可
    regAll(this.$store);
    //  console.log(this.$store);
    this.$store.dispatch(
      `${stores.js_chat.ns}/${js_chat.action.getAllMessages}`
    );
    this.$store.dispatch(`${stores.ts_chat.ns}/${ts_chat.action.init}`);

    this.$store.dispatch(`JsShoppingCart/products/getAllProducts`);
  },
  deactivated() {
    unregAll(this.$store);
  },
});
</script>
