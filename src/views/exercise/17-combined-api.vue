<template>
  <accordion-hull header="组合式Api">
    <accordion-item caption="预备:测试props的双向响应">
      <ul>
        <li>
          <span></span>
          <ul>
            <li>
              <span>父组件数据:</span>
              <span>myAge:{{ myAge }}</span>
              <span>myName:{{ myName }}</span>
              <span>myInfo:{{ myInfo }}</span>
            </li>
            <li>
              <button @click="modify">在父组件中修改props</button>
              <button @click="replace">在父组件中替换props</button>
            </li>
          </ul>
          <span>子组件渲染:</span>
          <ul>
            <li>
              <test-response
                :theAge="myAge"
                :theName="myName"
                :theInfo="myInfo"
              />
            </li>
          </ul>
        </li>
      </ul>
    </accordion-item>
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
          <span>父组件中更改,当前tt:{{ tt }},当前tm:{{ tm }}</span>
          <input type="text" v-model="tt" />
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
        @click="$refs.ssd.increaseReader"
      />
      <input
        type="button"
        value="同上,目的是消除模板内使用组件内部暴露方法时的警告红波浪线"
        @click="incReader"
      />
    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { defineComponent, ref, watch } from "vue";
import AccordionHull from "@/components/accordion/accordion-hull.vue"; // 子组件 @ is an alias to /src
import AccordionItem from "@/components/accordion/accordion-item.vue";
import TestCombinedApi from "@/components/17-combined-api/test-combined-api.vue";
import FirstSetupDemo from "@/components/17-combined-api/first-setup-demo.vue";
import SecondSetupDemo from "@/components/17-combined-api/second-setup-demo.vue";
import TestResponse from "@/components/17-combined-api/test-response.vue";
import { UserInfo } from "@/components/17-combined-api/types";

//export default class ComOrViewModel extends Vue { }     //ok
//由于只有一个导出，故可使用匿名的默认导出：
export default defineComponent({
  data() {
    return {
      myAge: 55,
      myName: "guoshi",
      myInfo: {
        a: 1,
        b: 2,
        c: {
          d: "hello,world",
          e: 3,
        },
      } as UserInfo,
    };
  },
  components: {
    AccordionHull,
    AccordionItem,
    TestCombinedApi,
    FirstSetupDemo,
    SecondSetupDemo,
    TestResponse,
  },
  setup() {
    const tt = ref("中华人民共和国万岁");
    const tm = "这个应该非响应式";
    watch(tt, (newValue, oldValue) => {
      console.log(`watch api [tt changed],${oldValue}===>${newValue}`);
    });
    //而tm作为非响应式, 则无法监听.其实编译都通不过;
    // watch(tm, (newV, oldV) => {
    //   console.log();
    // });
    // const ssd = ref<InstanceType<typeof SecondSetupDemo>>();
    // const myAdd = () => {
    //   ssd.value?.increaseReader();
    // };

    return {
      tt,
      tm,
      //   ssd,
    };
  },
  //选项式watch和上面的函数式watch工作互不影响,且api先于option
  watch: {
    tt(newV: string, oldV: string) {
      console.log(`watch option [tt changed],${oldV}===>${newV}`);
    },
    //选项式watch虽然可以通过编译,但也不会被调用,因为tm是非响应式的
    tm(newV: string, oldV: string) {
      console.log(`watch option [tm changed],${oldV}===>${newV}`);
    },
  },
  methods: {
    modify() {
      console.log("parent modify...");
      this.myAge++;
      this.myName += " h";
      this.myInfo.a++;
      this.myInfo.b++;
      this.myInfo.c.e++;
      this.myInfo.c.d += " -";
    },
    replace() {
      console.log("parent replace...");
      this.myAge = -100;
      this.myName = "Galinue";
      this.myInfo = {
        a: -1,
        b: -2,
        c: {
          d: "hey",
          e: -3,
        },
      };
    },
    incReader() {
      // const com = this.$refs.ssd as typeof SecondSetupDemo;   //ok,提示还是不好,可能是expose出来的方法,无法只能感知
      // com.increaseReader();
      //    this.myAdd();
      //顺便测试其他声明式方法
      //com.temp(); //failed
    },
  },
});
</script>
