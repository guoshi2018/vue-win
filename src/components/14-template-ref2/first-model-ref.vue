<template>
  <div ref="rootDiv">
    <div ref="div1">This is a ... root element</div>
    <span ref="span1">hello,span</span>
    <p ref="p1">
      <i>this is a paragrath ,without any property</i><span>this text is in span.</span>
    </p>
    <input type="button" value="组件内按钮,以ref操作元素" @click="demo1" ref="button1" />
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";
import { print } from "@/common/mixins/func";
const debug = false;

export default defineComponent({
  setup() {
    // 变量名必须采用对应元素的属性 ref="<...>" 的相同名称
    const rootDiv = ref();
    const div1 = ref();
    const span1 = ref();
    const p1 = ref();
    const button1 = ref();

    onMounted(() => {
      //   console.clear();
      print(debug,rootDiv.value, div1.value, span1.value, p1.value, button1.value);
    });
    return {
      rootDiv,
      div1,
      span1,
      p1,
      button1,
    };
  },
  methods: {
    demo1() {
      //  console.clear();
      //在setup中定义各个ref,并返回的目的:
      //可以使用更简短的属性(例如this.div1),代替原来的元素引用this.$refs.div1

      //如果没有ref()各个引用...
      const div_root = this.$refs.rootDiv as HTMLDivElement;
      const div_1 = this.$refs.div1 as HTMLDivElement;
      const span_1 = this.$refs.span1 as HTMLSpanElement;
      const p_1 = this.$refs.p1 as HTMLParagraphElement;
      const button_1 = this.$refs.button1 as HTMLButtonElement;
      print(debug,
        "info by this.$refs.<prop>:",
        div_root.childElementCount,
        div_1.textContent,
        span_1.innerText,
        p_1.innerHTML,
        button_1.value
      );

      //ref()后, 使用简短属性,并带有智能感知:
      const divRoot = this.rootDiv as HTMLElement;
      const div_one = this.div1 as HTMLDivElement;
      const span_one = this.span1 as HTMLSpanElement;
      const p_one = this.p1 as HTMLParagraphElement;
      const button_one = this.button1 as HTMLButtonElement;
      print(debug,
        "info by brief prop:",
        divRoot.childElementCount,
        div_one.textContent,
        span_one.innerText,
        p_one.innerHTML,
        button_one.value
      );

      //可以看出两者打印结果相同,全部为true.
      print(debug,
        divRoot == div_root,
        div_one == div_1,
        span_one == span_1,
        p_one == p_1,
        button_one == button_1
      );

      //这就是"在使用组合式 API 时，响应式引用和模板引用的概念是统一的"的含义
    },
  },
});
</script>
