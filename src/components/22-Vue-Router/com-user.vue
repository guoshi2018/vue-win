<comments>
  很多时候，我们需要将给定匹配模式的路由映射到同一个组件。
  例如，我们可能有一个 User 组件，它应该对所有用户进行渲染，
  但用户 ID 不同。在 Vue Router 中，我们可以在路径中使用
  一个动态字段来实现，我们称之为 路径参数.
</comments>
<template>
  <div class="test">
    <h2>Hi,this is information of com-user：</h2>
    <ul>
      <li>
        <span>id --- {{ $route.params.id }}</span>
      </li>
      <li>
        <span>name --- {{ $route.params.name }}</span>
      </li>
      <li>
        <span>userid == {{ $route.params.userid }}</span>
      </li>
      <li>
        <span>username == {{ $route.params.username }}</span>
      </li>
      <li>
        <span>$route.params == {{ $route.params }}</span>
      </li>
      <li>
        <span>$route.fullPath == {{ $route.fullPath }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { defineComponent, onMounted, onUpdated, watch, reactive } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

export default defineComponent({
  setup() {
    //仅仅路由参数变化，除了watch以外，其他都不会被调用
    const route = useRoute();
    console.log("combind API com-user setup(),", route);
    onMounted(() => {
      //console.clear();
      console.log("user-com onMounted......", route.params);
    });

    //组合式API 的路由监视。选项式的见app.vue
    watch(
      //route.params,           //fail
      () => route.params, //must ok,
      (toParms, prevParms) => {
        console.log(
          "combind API <com-user.vue> setup() watching route.params...",
          toParms,
          prevParms
        );
      }
    );
  },
});
</script>

<summary>
  View形式的组件，还需要到/router/index.ts中注册，在App.vue的适当位置设置链接
  若引用到.js文件，使用import时，需要到shims-vue.d.ts中declare一下。
</summary>
