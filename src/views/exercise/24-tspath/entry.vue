<template>
  <accordion-hull header="tsconfig.json关于非相对路径解析的配置测试">
    <accordion-item caption="路径解析, 注意控制台" show>
      <button @click="allPathTesting">使用相对路径</button>
    </accordion-item>
    <accordion-item caption=""> </accordion-item>
    <accordion-item caption=""> </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { ref, defineComponent } from "vue";
import { print } from "@/common/mixins/func";
const debug = true;

export default defineComponent({
  components: {},
  data() {
    // return {
    //   title: "path is here",
    // };
  },
  setup() {},
  methods: {
    //相对路径
    allPathTesting: async () => {
      //funA();

      print(debug,"entry.vue 使用相对路径, 导入 bb.ts:");
      const B = await import("./a/b/bb");
      B.funB();
      //进入bb.ts后,测试采用node_modules的裸路径正常, 但是, 纯baseUrl, 以及baseUrl配合paths, 以及
      //声明虚拟目录 rootDirs 均不凑效. 应该是这些配置没有被 webpack 接收到.
    },
    // //裸路径
    // useNudePath: () => {},
    // //虚拟路径
    // useVirtualPath: () => {},
  },
});
</script>

<summary>
  View形式的组件，还需要到/router/index.ts中注册，在App.vue的适当位置设置链接
  若引用到.js文件，使用import时，需要到shims-vue.d.ts中declare一下。
</summary>
