<template>
  <accordion-hull header="组合式Api">
    <accordion-item caption="生命周期钩子">
      <ul>
        <li>
          <span>
            组合式api下的setup中的生命周期钩子,与常规声明周期钩子演示,注意控制台
          </span>
          <test-combined-api :title="tt" />
          <test-combined-api :title="tm" />
        </li>
        <li>
          <span>观察上面的标题title是否响应式</span>
          <span>父组件中更改:</span><input type="text" v-model="tt" />
          <input type="text" v-model="tm" />
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="setup解析">
      <ol>
        <li>
          <first-setup-demo :title="tt" />
        </li>
      </ol>
    </accordion-item>
    <accordion-item
      caption="setup返回,使用渲染函数,将阻止我们返回任何其它的东西(例如template指定的内容)"
      show
    >
      <second-setup-demo ref="ssd" />
      <!-- ...increaseReader 或 ...increaseReader()不接分号均可以-->
      <input
        type="button"
        value="调用组件内部暴露方法,增加人数"
        @click="$refs.ssd.increaseReader()"
      />
    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { ref, watch } from "vue";
import AccordionHull from "@/components/accordion/accordion-hull.vue"; // 子组件 @ is an alias to /src
import AccordionItem from "@/components/accordion/accordion-item.vue";
import TestCombinedApi from "@/components/17-combined-api/test-combined-api.vue";
import FirstSetupDemo from "@/components/17-combined-api/first-setup-demo.vue";
import SecondSetupDemo from "@/components/17-combined-api/second-setup-demo.vue";
//export default class ComOrViewModel extends Vue { }     //ok
//由于只有一个导出，故可使用匿名的默认导出：
export default {
  components: {
    AccordionHull,
    AccordionItem,
    TestCombinedApi,
    FirstSetupDemo,
    SecondSetupDemo,
  },
  setup() {
    const tt = ref("中华人民共和国万岁");
    const tm = "这个应该非响应式";
    watch(tt, (newValue, oldValue) => {
      console.log(`watch api [tt changed],${oldValue}===>${newValue}`);
    });
    //而tm作为非响应式,则无法监听.其实编译都通不过
    //watch(tm, (newV, oldV) => {
    //  console.log()
    //});
    return {
      tt,
      tm,
    };
  },
  //选项式watch和上面的函数式watch工作互不影响,且api先于option
  watch: {
    tt(newV: string, oldV: string) {
      console.log(`watch option [tt changed],${oldV}===>${newV}`);
    },
    //选项是watch虽然可以通过编译,但也不会被调用,因为tm是非响应式的
    tm(newV: string, oldV: string) {
      console.log(`watch option [tm changed],${oldV}===>${newV}`);
    },
  },
};
</script>

<summary>
  View形式的组件，还需要到/router/index.ts中注册，在App.vue的适当位置设置链接
  若引用到.js文件，使用import时，需要到shims-vue.d.ts中declare一下。
</summary>
