<template>
  <!-- 下面的元素都会被return语句指定的html块替换掉-->
  <div>
    <div>This is a original root element</div>
    <span ref="temp">hey,herer</span>
  </div>
</template>

<script lang="tsx">
import { ref, defineComponent, h, onMounted } from "vue";
import { print } from "@/common/mixins/func";
const debug = false;

export default defineComponent({
  setup() {
    const t = ref("second"); //和上面的template的ref值无啥关系

    onMounted(function () {
      print(debug,
        "sorry,html is changed to :",
        ((t.value as unknown) as HTMLElement).outerHTML
      );
    });

    //ok
    return () => (
      <div ref={t} style="color:blue;font-size:2.3em;">
        <i>hello,jsx here</i>
      </div>
    );

    // or
    // return () =>
    //   h(
    //     "div",
    //     {
    //       ref: t, //这不会添加到子组件的$refs里面. 也不能写成t.value
    //       style: "color:red;font-size:2.3em;",
    //     },
    //     ["hello h method", "----------", " hey"]
    //   );
  },
});
</script>
