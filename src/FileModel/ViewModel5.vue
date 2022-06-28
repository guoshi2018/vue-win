<template>
  <accordion-hull :header="header">
    <accordion-item caption="" show> </accordion-item>
    <accordion-item caption=""> </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
  components: {},
  props: {
    header: {
      type: String,
      default: "本次演练的内容",
      required: true,
    },
  },
  setup(props, context) {},
});
</script>
<style lang="scss" scoped></style>

<summary>
  View形式的组件，还需要到/router/index.ts中注册，在App.vue的适当位置设置链接
  若引用到.js文件，使用import时，可能需要到shims-vue.d.ts中declare一下。
</summary>
