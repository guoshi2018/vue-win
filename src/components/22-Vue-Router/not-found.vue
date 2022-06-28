
<template>
  <div class="test">
    <h2>sorry,the page not found</h2>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { defineComponent, onMounted, onUpdated, watch, reactive } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { print } from "@/common/mixins/func";
const debug = false;

export default defineComponent({
  setup() {
    //仅仅路由参数变化，除了watch以外，其他都不会被调用
    const route = useRoute();
    print(debug,"not found setup(),", route);
    onMounted(() => {
      print(debug,"not found onMounted......", route.params);
    });
  },
});
</script>

<summary>
  View形式的组件，还需要到/router/index.ts中注册，在App.vue的适当位置设置链接
  若引用到.js文件，使用import时，需要到shims-vue.d.ts中declare一下。
</summary>
