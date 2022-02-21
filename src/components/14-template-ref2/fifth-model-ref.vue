<template>
  <div ref="root">This is a root element</div>
</template>

<script lang="ts">
import { ref, watchEffect, defineComponent } from "vue";

export default defineComponent({
  setup() {
    const root = ref(null);

    //使用模板引用的侦听器应该用 flush: 'post' 选项来定义，
    //这将在 DOM 更新后运行副作用，确保模板引用与 DOM 保持同步，并引用正确的元素。
    watchEffect(
      () => {
        console.log("haha:", root.value); // => Dom更新后:<div />
      },
      {
        flush: "post",
      }
    );
    return {
      root,
    };
  },
});
</script>
