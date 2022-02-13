<template>
  <accordion-hull header="响应式计算和侦听">
    <accordion-item caption="计算值" show>
      <ol>
        <li>
          <button @click="demo1">computed 函数,接受getter函数</button>
          <button @click="demo2">computed 函数,接受getter和setter函数</button>
          <button @click="demo3">基于demo2,一个无聊但有意义的例子</button>
          <button @click="demo4">仅开发模式下生效的调试Computed</button>
          <button @click="demo5">
            根据响应式状态自动应用和重新应用副作用的watchEffect函数
          </button>
          <button @click="demo6">清除watchEffect副作用</button>
        </li>
        <li>
          <span
            >通过控制台观察副作用的刷新时机,默认情况下,会在所有组件update之前执行:{{
              count
            }}</span
          ><br />
          <input type="number" v-model="count" />
          <button @click="demo7">查看副作用刷新时机</button>
        </li>
        <li>
          <span>watch方法,等同于组件侦听器的property</span><br />
          <button @click="demo8">侦听单个数据源:一个getter</button>
          <button @click="demo9">侦听ref</button>
          <button @click="demo10">侦听ref形式的多个数据源</button>
          <button @click="demo11">侦听响应式对象</button>
          <button @click="demo12">深度嵌套对象或数组的侦听</button>
          <button @click="demo13">完全侦听深度嵌套的对象和数组</button>
        </li>
      </ol>
    </accordion-item>
    <accordion-item caption=""> </accordion-item>
    <accordion-item caption=""> </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import {
  ref,
  watch,
  computed,
  reactive,
  watchEffect,
  nextTick,
  defineComponent,
} from "vue";

//import _ from '@/common/js/lodash.js';

import AccordionHull from "@/components/accordion/accordion-hull.vue"; // 子组件 @ is an alias to /src
import AccordionItem from "@/components/accordion/accordion-item.vue";
import { sleep } from "@/common/mixins/func.ts";

export default defineComponent({
  //   mixins: [Func],
  components: {
    AccordionHull,
    AccordionItem,
  },
  props: {
    message: {
      type: String,
      required: false,
    },
  },
  setup() {
    //    console.log(context);
    const count = ref(0);
    return {
      count,
    };
  },
  methods: {
    demo1() {
      console.log(
        "使用 computed 函数：它接受 getter 函数并为 getter 返回的值返回一个不可变的响应式 ref 对象"
      );
      const count = ref(1);
      const plusOne = computed(() => ++count.value);
      console.log(plusOne.value);
      //plusOne.value++;        //error, for readonly
    },
    demo2() {
      console.log("使用一个带有 get 和 set 函数的对象来创建一个可写的 ref 对象。");
      const count = ref(1);
      const plusOne = computed({
        get: () => count.value++,
        set: (val) => {
          count.value = val - 1;
        },
      });
      plusOne.value = 100;
      console.log(count.value); //100-1 = 99
      console.log(plusOne.value); //99
      console.log(count.value); //99++ = 100
    },
    demo3() {
      console.log("一个无聊的getter和setter");
      const a = ref(10);
      const b = ref(20);
      const plus = computed({
        get: () => a.value + b.value,
        set: (val) => {
          a.value = val / 2;
          b.value = val / 3;
        },
      });
      console.log(plus.value); //30
      plus.value = 60;
      console.log(a.value, b.value, plus.value); //30,20,50
    },
    demo4() {
      console.log(
        "依赖被追踪触发onTrack,和依赖被更改触发onTrigger.但是,onTrack和onTrigger不知从哪儿import"
      );
      const count = ref(1);
      const plus = computed(
        {
          get: () => count.value + 1,
          set: (val) => {
            count.value = val - 1;
          },
        },
        {
          onTrack(e) {
            // 当 count.value 作为依赖被追踪时触发
            //debugger
            console.info("onTrack", e, e.newValue, e.oldValue);
          },
          onTrigger(e) {
            // 当 count.value 被修改时触发
            //debugger
            console.info("onTrigger", e, e.newValue, e.oldValue);
          },
        }
      );
      console.log(plus.value); //触发onTrack
      count.value++; //触发onTrigger
      plus.value = 100; //
    },
    async demo5() {
      //为了根据响应式状态自动应用和重新应用副作用，我们可以使用 watchEffect 函数。
      //它立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。
      const count1 = ref(10);
      const count2 = ref(100);
      const count3 = ref(1000);
      const stop = watchEffect(() => console.log(count1.value, count2.value));
      const timer = setInterval(async () => {
        count1.value++;
        await sleep(500); //不停一会,则count1和count2两个的变化做一次响应
        count2.value++;
        count3.value++; //不触发
      }, 1500);

      await sleep(6000);
      //显示调用以停止侦听
      stop();
      console.log(
        `now watchEffect is stopped.count1=${count1.value},count2=${count2.value}`
      );
      await sleep(3000);
      clearInterval(timer);
      console.log(`now timer is clear.count1=${count1.value},count2=${count2.value}`);
    },
    demo6() {
      console.log(
        "参见:https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#%E6%B8%85%E9%99%A4%E5%89%AF%E4%BD%9C%E7%94%A8"
      );
    },
    demo7() {
      watchEffect(
        async () => {
          //await sleep(1000);     //这么搞,后面就不执行
          console.log("watchEffect trigger:", this.count); //.value 是 undefined
          await sleep(1000);
          console.log("watchEffect end");
        },
        {
          flush: "sync", //默认pre:副作用在更新前执行;post:之后;sync:强制效果始终同步触发
          onTrigger(e) {
            console.log("trigger:", e);
          },
          onTrack(e) {
            console.log("track:", e);
          },
        }
      );
    },
    async demo8() {
      //watch侦听getter:
      const state = reactive({
        count: -32,
      });
      watch(
        () => state.count,
        (cur, prev) => {
          console.log("watch trigger:", cur, prev);
        }
      );
      state.count++;
      await sleep(500);
      state.count++;
    },
    async demo9() {
      const count = ref(15);
      watch(count, (cur, prev) => {
        console.log("watch trigger:", cur, prev);
      });
      count.value++;
      await sleep(500);
      count.value++;
    },
    async demo10() {
      //侦听多个数据源,使用数组
      const firstName = ref("guo");
      const lastName = ref("shi");
      watch(
        [firstName, lastName],
        (cur, prev) => {
          console.log("watch multiple trigger:", cur, prev);
        },
        {
          flush: "pre", //默认pre:副作用在更新前执行;post:之后;sync:强制效果始终同步触发
        }
      );
      firstName.value = "bill";
      //await sleep(500);        //否则,只会触发一次,除非上面的flush配置未sync
      await nextTick(); //或者,调用vue提供的全局方法nextTick()
      lastName.value = "gates";
    },
    async demo11() {
      const nums = reactive([1, 2, 3, 4, 5]);
      const arr = [-1, -2, -3, -4, -5];
      const nums2 = reactive(arr);
      watch(
        //    [...nums],          //fail
        //     nums,             //这样监听到的是proxy对象
        //    arr,                //fail
        //     () => arr,          //fail
        //[...nums],                  //fail

        () => [...nums2], //must ok
        //() => [...nums],        //must ok
        (cur, prev) => {
          console.log("watch array:", cur, prev);
        }
      );
      nums.push(8);
      nums2.push(-8);
      await nextTick();
      nums.push(99);
      nums2.push(-99);
    },
    async demo12() {
      //检查深度嵌套对象或数组中的 property 变化时，仍然需要 deep 选项设置为 true。
      const state = reactive({
        id: 1,
        attributes: {
          name: "guoshi",
          age: 51,
        },
      });
      //watch(
      //  () => state,
      //  (cur, prev) => {
      //    console.log('default to not deep,', cur, prev);
      //  },
      //  {
      //    deep: false,    //实验证明,保持默认false或显示指定为false,watch不起作用
      //  }
      //);
      //然而，侦听一个响应式对象或数组将始终返回该对象的当前值和上一个状态值的引用
      watch(
        () => state,
        (cur, prev) => {
          //     console.log('deep,', cur, prev); //很奇怪,这里得到的是proxy对象,target又没有public
          console.log(
            "deep,",
            cur.id,
            cur.attributes.age,
            cur.attributes.name,
            "<----",
            prev.id,
            prev.attributes.age,
            prev.attributes.name
          ); //只好如此了
        },
        {
          deep: true,
        }
      );
      state.id = 100;
      await sleep(1000);
      state.attributes.name = "hello";
      await sleep(1000);
      state.attributes.age = 18;
    },
    async demo13() {
      //为了完全侦听深度嵌套的对象和数组，可能需要对值进行深拷贝。
      //这可以通过诸如 lodash.cloneDeep 这样的实用工具来实现。
      const state = reactive({
        id: 1,
        attributes: {
          name: "guoshi",
          age: 52,
        },
      });
      watch(
        //() => state,        //这样,因为deep默认为false,又没反应

        //   () => _.cloneDeep(state),            //ok,注意释放import注释
        () => JSON.parse(JSON.stringify(state)), //这样简单深拷贝也ok
        (cur, prev) => {
          //console.log(cur.attributes.name, prev.attributes.name)
          console.log(cur, prev); //终于,得到的是 state对象
        }
      );
      state.id = 100;
      await sleep(1000);
      state.attributes.name = "hello";
      await sleep(1000);
      state.attributes.age = 18;
    },
  },
});
</script>

<summary>
  View形式的组件，还需要到/router/index.ts中注册，在App.vue的适当位置设置链接
  若引用到.js文件，使用import时，需要到shims-vue.d.ts中declare一下。
</summary>
