<template>
  <accordion-hull header="响应性基础">
    <accordion-item caption="响应实验,请关注控制台">
      <button @click="demo1">声明响应式状态</button>
      <button @click="demo2">创建独立的响应式值作为 refs</button>
    </accordion-item>
    <accordion-item caption="Ref 解包">
      <span>{{ count }}</span>
      <button @click="count++">Increment count</button>
      <button @click="nested.count.value++">Nested Increment count</button>
      <button @click="reacted.count++">Reacted Increment count</button>
      <button @click="reacted.tmd.count++">Reacted twice Increment count</button>
    </accordion-item>
    <accordion-item caption="访问响应式对象" show>
      <button @click="demo3">自动解包内部值</button>
      <button @click="demo4">Ref 解包仅发生在被响应式 Object 嵌套的时候</button>
      <button @click="demo5">响应式状态解构</button>
      <button @click="demo6">使用readonly 防止更改响应式对象</button>
    </accordion-item>
    <accordion-item>
      <div>dhel</div>
    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
  /* eslint-disable no-dupe-class-members, no-dupe-keys */
  import { reactive, ref, toRefs, readonly, defineComponent } from "vue";
  import AccordionHull from "@/components/accordion/accordion-hull.vue"; // 子组件 @ is an alias to /src
  import AccordionItem from "@/components/accordion/accordion-item.vue";

  export default defineComponent({
    components: {
      AccordionHull,
      AccordionItem,
    },
    setup() {
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
    methods: {
      //demo1的注释，还是显示不了
      demo1() {
        const state = reactive({
          count: 30,
        });
        console.log(`state.count = ${state.count}`);
      },
      demo2() {
        //与reactive作用相同
        const count = ref(120); //初始值120
        console.log(count.value);
        count.value++;
        console.log(count);
      },
      demo3() {
        const count = ref(0);
        const state = reactive({
          count, //count:count
        });
        console.log("demo3,state.count:", state.count);
        state.count++;
        console.log("after state.count++ in demo3,count.value :", count.value);

        //如果将新的 ref 赋值给现有 ref 的 property，将会替换旧的 ref
        //const otherCount = ref(200);
        //state.count = otherCount;     //可惜這句被tsconfig阻止编译
        //console.log('demo3,state.count:', state.count);
        //console.log('demo3,count.value:', count.value);
      },
      demo4() {
        const books = reactive([ref("Vue 3 Guide")]);
        console.log(books[0].value); //需要.value
        const mp = reactive(new Map([["count", ref(11)]]));
        console.log(mp.get("count")?.value); //需要.value
      },
      demo5() {
        const book = reactive({
          author: "Vue Team",
          year: "2020",
          title: "Vue 3 Guide",
          description: "You are reading this book right now",
          price: "free",
        });

        //如果这样结构,两个property均丢失响应性
        //let { author, title } = book;

        //将响应式对象转换为一组 ref。这些 ref 将保留与源对象的响应式关联：
        const { title } = toRefs(book);
        title.value = "a newly book about vue4.5";
        console.log(book.title);
      },
      demo6() {
        const orig = reactive({
          count: 10,
        });
        const copy = readonly(orig);
        //通过orig修改count,将会触发依赖 copy 的侦听器
        orig.count++;
        console.log("orig.count:", orig.count, " copy.count:", copy.count);
        //copy.count++;     //编译失败.如果是js文件,则警告:
      },
    },
  });
</script>

<summary>
  View形式的组件，还需要到/router/index.ts中注册，在App.vue的适当位置设置链接
  若引用到.js文件，使用import时，需要到shims-vue.d.ts中declare一下。
</summary>
