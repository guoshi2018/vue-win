<template>
  <div>
    <span>props:{{title}}</span>
    <span>data:{{obj.name}},{{obj.age}},{{school}}</span>
    <span>setup:{{count}},{{nested.count.value}},{{reacted.count}},{{reacted.tmd.count}}</span>
  </div>
</template>

<script lang="ts">
  import {
    ref,
    toRefs,
    reactive,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted,
    defineComponent,
  } from "vue";

  export default defineComponent({
    props: {
      title: {
        type: String,
        required: true,
        //       default:'默认标题',
      },
    },
    data() {
      // console.log('data().....');
      return {
        obj: {
          age: 18,
          name: 'Hendery',
        },
        school: 'sanxiao',
      };
    },
    setup(props, context) {

      //console.log('setup...', props);
      //因为 props 是响应式的，你不能使用 ES6 解构，它会消除 prop 的响应性。
      //如果需要解构 prop，可以在 setup 函数中使用 toRefs 函数来完成此操作
      const { title: ptitle } = toRefs(props);  //同时重命名
      console.log(ptitle.value);

      // Attribute (非响应式对象，等同于 $attrs)
      console.log(context.attrs)

      // 插槽 (非响应式对象，等同于 $slots)
      //console.log(context.slots)

      // 触发事件 (方法，等同于 $emit)
      //console.log(context.emit)

      // 暴露公共 property (函数)
      //console.log(context.expose)


      onBeforeMount(function () {
        // console.log('onBeforeMount...');

      });
      onMounted(() => {
        // console.log('onMounted...');
      });
      onBeforeUpdate(() => {
        // console.log('onBeforeUpdate...');
      });
      onUpdated(() => {
        // console.log('onUpdated...');
      });
      onBeforeUnmount(() => {
        // console.log('onBeforeUnmount...');
      });
      onUnmounted(() => {
        // console.log('onUnmounted...');
      });

      const count = ref(99);
      return {
        count, //在模板中被访问时，它将自动浅层次解包内部值
        nested: {
          count,  //访问嵌套的 ref 时需要在模板中添加 .value
        },
        reacted: reactive({
          count,      //不添加.value,直接采用reacted.count
          tmd: reactive({
            count,      //reacted.tmd.count
          }),
        }),
      };
    },
    beforeCreate() {
      // console.log('beforeCreate...');
    },
    created() {
      // console.log('created...');
    },
    beforeMount() {
      //   console.log('beforeMount...');

    },
    mounted() {
      // console.log('mounted...');

    },
    beforeUpdate() {
      // console.log('beforeUpdate...');
    },
    Updated() {
      // console.log('Updated...');
    },
    beforeUnmount() {
      // console.log('beforeUnmount...');
    },
    Unmounted() {
      // console.log('Unmounted...');
    },
    watch: {
      title(newV: string, oldV: string) {
        console.log(`child, title changed.${oldV}==>${newV}`);

      },
    },
    methods: {
      firstMethod() {
        console.log('methods firstMethod() run.', this);
        this.secondMethod();
      },
      secondMethod() {
        console.log('methods secondMethod() run');
      },
    }
  });
</script>

