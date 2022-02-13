<template>
  <div>
    <p>hello,world</p>
  </div>
</template>
<script lang="ts">
  import {
    h,
    ref,
    reactive,
    defineComponent,
  } from "vue";

  export default defineComponent({
    setup(props, context) {
      //还可以返回一个渲染函数，该函数可以直接使用在同一作用域中声明的响应式状态：
      //返回一个渲染函数将阻止我们返回任何其它的东西。从内部来说这不应该成为一个问题，
      //但当我们想要将这个组件的方法通过模板 ref 暴露给父组件时就不一样了。
      //我们可以通过调用 expose 来解决这个问题，给它传递一个对象，其中定义的
      //property 将可以被外部组件实例访问
      const readersNumber = ref(101);
      const book = reactive({ title: 'Vue 3 Guide' });
      const increaseReader = () => ++readersNumber.value;
      const { expose } = context;
      expose({
        increaseReader,
      });
      return () => h('div', [readersNumber.value, '----', book.title]);
    }
  });
</script>

