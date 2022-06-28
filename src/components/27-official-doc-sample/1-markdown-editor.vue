<template>
  <div id="editor">
    <textarea :value="input" @input="update"></textarea>
    <div v-html="compiledMarkdown"></div>
  </div>
</template>

<script lang="ts">
//import _ from "lodash"; // ok
import _ from "lodash-js";

import { marked } from "marked";
import { ref, defineComponent, computed } from "vue";

export default defineComponent({
  //#region 原版:波浪线太多
  // data() {
  //   return {
  //     input: "# hello",
  //   };
  // },
  // computed: {
  //   compiledMarkdown(vm) {
  //     return marked(vm.input, { sanitize: true });
  //   },
  // },
  // methods: {
  //   update: _.debounce((e: Event) => {
  //     this.input = e.target.value;
  //   }, 300),
  // },
  //#endregion

  setup() {
    const input = ref("# hello");
    const compiledMarkdown = computed(() => marked(input.value, { sanitize: true }));
    const update = _.debounce((e: Event) => {
      input.value = (e.target as HTMLInputElement).value;
    }, 300);

    // const update = _.debounce((e: InputEvent) => {
    //   //e.data返回当前输入的字符串，如果是删除操作，则该值为空字符串。
    //   //而不是当前编辑框的值
    //   console.log("current data:", e.data);
    //   input.value = e.data || "";
    // }, 300);

    return {
      input,
      update,
      compiledMarkdown,
    };
  },
});
</script>

<style lang="scss" scoped>
#editor {
  margin: 0;
  /*height: 100%;*/
  height: 50em;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #333;
}

textarea,
#editor div {
  display: inline-block;
  width: 40%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

textarea {
  border: none;
  width: 40%;

  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}
</style>
