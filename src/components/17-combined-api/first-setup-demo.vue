<template>
  <div>
    <h3>title is &lt;{{title}}&gt;</h3>
    <h4>cap1 is &lt;{{cap1}}&gt;</h4>
    <h5>cap2 is &lt;{{cap2}}&gt;</h5>
    <div>
      {{readersNumber}},{{book.title}}
    </div>
  </div>
</template>

<script lang="ts">
  import {
    ref,
    toRef,
    toRefs,
    reactive,
    defineComponent,
  } from "vue";

  export default defineComponent({
    props: {
      title: {
        type: String,
        required: true,
      },
      cap1: {
        type: String,
        required: false,
      },
      cap2: {
        type: String,
        required: false,
      }
    },
    setup(props, context) {
      //props是响应式的,当传入新的 prop 时，它将被更新。
      //所以,也不能使用 ES6 解构，它会消除 prop 的响应性。
      console.log(props);

      //若需结构:
      const { title } = toRefs(props);    //注意这个title和模板中的title没有关系
      console.log(title.value);

      //cap1是可选的prop,则上述的props中可能没有title(实际是:当消费端未提供cap1,props.cap.value=undefined)
      //若果还是仿上结构,则得到undefined.
      const { cap1 } = toRefs(props);
      console.log(cap1.value);  //undefined

      //可以使用toRef,例如cap2.感觉其实与上面结果一样
      const cap2 = toRef(props, 'cap2');
      console.log(cap2, cap2.value);

      console.log('context参数,非响应式  -----------------------------');
      console.log(context.attrs)// Attribute (非响应式对象，等同于 $attrs)
      console.log(context.slots)// 插槽 (非响应式对象，等同于 $slots)
      console.log(context.emit) // 触发事件 (方法，等同于 $emit)
      console.log(context.expose)// 暴露公共 property (函数)
      //详见: https://v3.cn.vuejs.org/guide/composition-api-setup.html#%E8%AE%BF%E9%97%AE%E7%BB%84%E4%BB%B6%E7%9A%84-property

      //如果 setup 返回一个对象，那么该对象的 property 以及传递给 setup
      //的 props 参数中的 property 就都可以在模板中访问到：
      //注意，从 setup 返回的 refs 在模板中访问时是被自动浅解包的，因此不应在模板中使用 .value
      const readersNumber = ref(23);
      const book = reactive({
        title: 'Vue is so excellent.',
      });
      return {
        readersNumber,
        book,
      }
    }
  });
</script>

