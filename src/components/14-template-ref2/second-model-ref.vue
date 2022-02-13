<template>
  <div>
    <div ref="root">This is a root element</div>
  </div>
</template>

<script lang="tsx">
  import {
    ref,
  } from "vue";

  export default {

    setup() {
      const root = ref(null);
      //return () =>
      //  h('div', {
      //    ref: root,
      //    style:'color:red;font-size:2.2em;',
      //  }, ['hello world', '----------', ' hey']);

      //vs 对jsx语法的智能感知还有问题,vs code 反过来，还行
      return () => <div ref={ root } style='color:blue;font-size:2.3em;' >hello,jsx here</div>;  
    }
  };
</script>

