<template>
  <!-- 下面的元素都会被return语句指定的html块替换掉-->
  <div>
    <div>This is a original root element</div>
    <span ref="temp">hey,herer</span>
  </div>
</template>

<script lang="tsx">
import { ref, defineComponent, h, onMounted } from "vue";

export default defineComponent({
  setup() {
    const t = ref("second"); //和上面的template的ref值无啥关系

    onMounted(function () {
      console.log(
        "sorry,html is changed to :",
        (t.value as unknown as HTMLElement).outerHTML
      );
    });

    // return () => (
    //   <div ref={t} style="color:blue;font-size:2.3em;">
    //     <i>hello,jsx here</i>
    //   </div>
    // );

    return () =>
      h(
        "div",
        {
          ref: t,
          style: "color:red;font-size:4.2em;",
        },
        ["hello world", "----------", " hey"]
      );
  },
});
</script>
