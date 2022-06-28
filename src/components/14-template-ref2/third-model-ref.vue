<template>
  <!--组合式 API 模板引用在 v-for 内部使用时没有特殊处理。相反，请使用函数引用执行自定义处理：-->
  <div
    v-for="(item, i) in list"
    :ref="
      (el) => {
        if (el) divs[i] = el;
      }
    "
    :key="i"
  >
    <!--不是很懂-->
    {{ item }}---{{ divs[i] }}
  </div>
  <button @click="showDivs">打印divs</button>
</template>

<script lang="ts">
import {
  ref,
  reactive,
  defineComponent,
  onBeforeUpdate,
  ComponentPublicInstance,
  Ref,
} from "vue";
import { print } from "@/common/mixins/func";
const debug = false;

export default defineComponent({
  setup() {
    const list = reactive([1, 2, 3]);
    const divs: Ref<ComponentPublicInstance<any>[]> = ref([]);

    // 确保在每次更新之前重置ref
    onBeforeUpdate(() => {
      divs.value = [];
    });
    return {
      list,
      divs,
    };
  },
  methods: {
    showDivs() {
      print(debug,this.divs);
    },
  },
});
</script>
