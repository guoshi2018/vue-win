<template>
  <accordion-hull header="Typescript支持">
    <accordion-item caption="" show>
      <ul>
        <li>
          <span>message:{{ message }}</span>
          <span>greeting:{{ greeting }}</span>
          greetingUppercased:<input
            type="text"
            v-model="greetingUppercased"
          /><br />
          message:<input type="text" v-model="message" />
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="测试this.$router">
      <button @click="seeRouter">看看</button>
    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import {
  ref,
  reactive,
  computed,
  defineComponent, //启用类型推断
  onBeforeMount,
  onMounted,
  PropType,
} from "vue";

// import AccordionHull from "@/components/accordion/accordion-hull.vue"; // 子组件 @ is an alias to /src
// import AccordionItem from "@/components/accordion/accordion-item.vue";

interface Book {
  title: string;
  author?: string;
  year?: number;
}
interface Article {
  title: string;
  year?: number;
}

//为了得到Typescript的全力支持，应该使用defineComponent方法
export default defineComponent({
  components: {},
  data() {
    return {
      message: "hello",
    };
  },
  props: {
    name: String,
    id: [Number, String],
    success: {
      type: String,
      default: "you win",
    },
    callback: {
      type: Function as PropType<() => void>,
    },
    book: {
      type: Object as PropType<Book>,
      required: true,
    },
    metadata: {
      type: null, //metadata的类型是any
    },

    //由于 TypeScript 中的设计限制，当它涉及到为了对函数表达式进行类型推理，
    //你必须注意对象和数组的 validator 和 default 值
    articleA: {
      type: Object as PropType<Article>,
      //务必使用箭头函数，或明确提供一个this参数，如articleB所示
      default: () => ({
        title: "Arror Function Expression",
      }),
      validator: (art: Article) => !!art.title,
    },
    articleB: {
      type: Object as PropType<Article>,
      //提供明确的this参数
      default(this: void) {
        return {
          title: "Common Function Expression",
        };
      },
      validator(this: void, art: Article) {
        return !!art.title;
      },
    },
  },
  setup() {
    onBeforeMount(() => {
      console.log("...onBeforeMount");
    });
    onMounted(() => {
      console.log("...onMounted");
    });

    //为 ref 的内部值指定复杂类型
    const year = ref<string | number>("2020"); //year's type:Ref<string|number>
    year.value = 1993; //ok
    year.value = "hello world"; //ok

    //为子组件的模板引用定义类型，以便提示可用方法的类型信息： ref<InstanceType<typeof MyModal>>()
    //见：https://v3.cn.vuejs.org/guide/typescript-support.html#%E4%B8%BA%E6%A8%A1%E6%9D%BF%E5%BC%95%E7%94%A8%E5%AE%9A%E4%B9%89%E7%B1%BB%E5%9E%8B

    //reactive类型声明
    const book1 = reactive<Book>({ title: "Vue 3 Guide" }); //ok
    const book2: Book = reactive({ title: "Vue 3 tutorial" }); //ok
    const book3 = reactive({ title: "yesterday..." }) as Book;
    console.log(book1, book2, book3);
    //computed属性的类型声明，计算值将根据返回值自动推断类型
    const count = ref(0);
    const doubleCount = computed(() => count.value * 2);
    console.log(doubleCount);
    //const result = doubleCount.value.split('') // => Property 'split' does not exist on type 'number'

    //事件处理器添加类型
    const handleTextChange = (evt: Event) => {
      //evt默认为any,仅仅隐式声明,ts则编译错误
      console.log(evt);
    };
    console.log(handleTextChange);

    //可以显式声明并转换，让ts没话说
    const handleTextChange2 = (evt: Event) => {
      console.log(evt.target as HTMLInputElement);
    };
    console.log(handleTextChange2);

    //略
    // return{

    // };
  },
  computed: {
    //必须的类型注解
    greeting(): string {
      return this.message + "!!!";
    },

    greetingUppercased: {
      get(): string {
        return this.greeting.toUpperCase(); //instead of greeting()
      },
      set(newValue: string) {
        this.message = newValue.toLowerCase();
      },
    },
  },
  //我们可以为触发的事件注解一个有效载荷。另外，所有未声明的触发事件在调用时都会抛出一个类型错误
  emits: {
    addBook(payload: { bookName: string }) {
      //perform runtime 验证
      return payload.bookName.length > 0;
    },
  },
  methods: {
    onSubmit() {
      this.$emit("addBook", {
        bookName: 123, //类型错误
      });
      this.$emit("non-declare-event"); //类型错误。
    },
    seeRouter() {
      console.log("haha,this.$route is ", this.$route);
    },
  },
});
</script>
