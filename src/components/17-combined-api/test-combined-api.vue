<template>
  <div>
    <span>props:{{ title }}</span>
    <span>data:{{ obj.name }},{{ obj.age }},{{ school }}</span>
    <span>
      setup:{{ count }},{{ nested.count.value }},{{ reacted.count }},{{
        reacted.tmd.count
      }}
    </span>
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
import { print } from "@/common/mixins/func";

const debug = false;
export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
      //       default:'默认标题',
    },
  },
  data() {
    print(debug, "data().....");
    return {
      obj: {
        age: 18,
        name: "Hendery",
      },
      school: "sanxiao",
    };
  },
  setup(props, context) {
    print(debug, "setup...", props);
    //因为 props 是响应式的，你不能使用 ES6 解构，它会消除 prop 的响应性。
    //如果需要解构 prop，可以在 setup 函数中使用 toRefs 函数来完成此操作
    const { title: ptitle } = toRefs(props); //同时重命名
    print(debug, "保持响应式的解构后,并重命名为ptitle:", ptitle.value);

    // Attribute (非响应式对象，等同于 $attrs)
    print(debug, context.attrs);

    // 插槽 (非响应式对象，等同于 $slots)
    print(debug, context.slots);

    // 触发事件 (方法，等同于 $emit)
    print(debug, context.emit);

    // 暴露公共 property (函数)
    print(debug, context.expose);

    onBeforeMount(function () {
      print(debug, "onBeforeMount...");
    });
    onMounted(() => {
      print(debug, "onMounted...");
    });
    onBeforeUpdate(() => {
      print(debug, "onBeforeUpdate...");
    });
    onUpdated(() => {
      print(debug, "onUpdated...");
    });
    onBeforeUnmount(() => {
      print(debug, "onBeforeUnmount...");
    });
    onUnmounted(() => {
      print(debug, "onUnmounted...");
    });

    const count = ref(99);
    return {
      count, //在模板中被访问时，它将自动浅层次解包内部值
      nested: {
        count, //访问嵌套的 ref 时需要在模板中添加 .value
      },
      reacted: reactive({
        count, //不添加.value,直接采用reacted.count
        tmd: reactive({
          count, //reacted.tmd.count
        }),
      }),
    };
  },
  beforeCreate() {
    print(debug, "beforeCreate...");
  },
  created() {
    print(debug, "created...");
  },
  beforeMount() {
    //   print(debug,'beforeMount...');
  },
  mounted() {
    print(debug, "mounted...");
  },
  beforeUpdate() {
    print(debug, "beforeUpdate...");
  },
  Updated() {
    print(debug, "Updated...");
  },
  beforeUnmount() {
    print(debug, "beforeUnmount...");
  },
  Unmounted() {
    print(debug, "Unmounted...");
  },
  watch: {
    title(newV: string, oldV: string) {
      print(debug, `child, title changed.${oldV}==>${newV}`);
    },
  },
  methods: {
    firstMethod() {
      print(debug, "methods firstMethod() run.", this);
      this.secondMethod();
    },
    secondMethod() {
      print(debug, "methods secondMethod() run");
    },
  },
});
</script>
