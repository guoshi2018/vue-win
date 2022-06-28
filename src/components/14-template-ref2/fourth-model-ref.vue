<template>
  <div ref="root">This is a root element</div>
</template>

<script lang="ts">
import { ref, watchEffect, defineComponent } from "vue";
import { print } from "@/common/mixins/func";
const debug = false;

export default defineComponent({
  setup() {
    const root = ref(null);
    watchEffect(() => {
      // 这个副作用在 DOM 更新之前运行，因此，模板引用还没有持有对元素的引用。
      print(debug,"watch effect :", root.value); // => 第一次(Dom更新前):null 第二次(Dom更新后):<div />
    });
    return {
      root,
    };
  },
});
</script>
