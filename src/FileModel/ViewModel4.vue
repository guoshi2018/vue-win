<template>
  <accordion-hull header="">
    <accordion-item caption="" show> </accordion-item>
    <accordion-item caption=""> </accordion-item>
    <accordion-item caption=""> </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";
// import AccordionHull from "@/components/accordion/accordion-hull.vue"; // 子组件 @ is an alias to /src
// import AccordionItem from "@/components/accordion/accordion-item.vue";

export default {
  components: {},
  data() {
    return {
      title: "setup hook demo",
    };
  },
  setup() {
    onBeforeMount(() => {});
    onMounted(() => {});
    onBeforeUpdate(() => {});
    onUpdated(() => {});
    onBeforeUnmount(() => {});
    onUnmounted(() => {});
  },
};
</script>

<summary>
  View形式的组件，还需要到/router/index.ts中注册，在App.vue的适当位置设置链接
  若引用到.js文件，使用import时，可能需要到shims-vue.d.ts中declare一下。
</summary>
