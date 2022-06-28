<template>
  <accordion-hull header="自定义plugin测试">
    <accordion-item caption="测试I8n" show>
      <input type="text" placeholder="输入查询字串,以.分隔" v-model="i18nKeys" />:
      <span>{{ i18nResult }}</span>
    </accordion-item>
    <accordion-item caption="测试toast">
      <input type="button" value="try it" @click="showToast" />
    </accordion-item>
    <accordion-item caption="多个store的切换测试" show>
      <input
        type="button"
        value="try it. useStore涉及到inject(),只能在setup或函数式组件中调用."
        @click="switchStore"
      />
      <h4>结论:</h4>
      <p>
        可以切换, 但是还原后的store可能无法被原先可以正常使用的组件使用, 不论在setup中,
        还是 在 onDeactived中进行. 为保障其他组件正常, 现已将其注释.
      </p>
    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  getCurrentInstance,
  ComponentInternalInstance,
  onDeactivated,
} from "vue";
import { useStore } from "vuex";
import stdstore from "@/store/index"; //index.
import tempstore from "@/store/temp-store";
import { studentAsTopstoreKey } from "@/store/setup";
import { print, useCom } from "@/common/mixins/func";
const debug = true;

export default defineComponent({
  //#region 选项式
  // data() {
  //   return {
  //     i18nKeys: "",
  //   };
  // },
  // computed: {
  //   i18nResult(vm) {
  //     return vm.$translate(vm.i18nKeys);
  //   },
  // },
  // methods: {
  //   showToast() {
  //     this.$toast({
  //       message: "我是toast插件",
  //       duration: 8000,
  //       onClose: () => {
  //         print(debug, "已关闭");
  //       },
  //     });
  //     //  this.$toast(); //最简式
  //   },
  // },
  //#endregion
  setup() {
    const comWrapper = useCom();

    const i18nKeys = ref("abc");
    const i18nResult = computed(() => comWrapper.com.$translate(i18nKeys.value));
    const showToast = () => {
      comWrapper.com.$toast({
        message: "我是toast插件",
        duration: 8000,
        onClose: () => {
          print(debug, "已关闭");
        },
      });
      //  this.$toast(); //最简式
    };
    const switchStore = () => {
      print(debug, "useStore涉及到inject(),只能在setup或函数式组件中调用");
    };

    //#region 只能在此切换
    // const s1 = useStore(studentAsTopstoreKey);
    // print(debug, "before switch, store 1 is :", s1);

    // comWrapper.app.use(tempstore);
    // const s2 = useStore();
    // print(debug, "after switch, store 2 is :", s2);

    // //这样得到的s3 == s2
    // comWrapper.app.use(stdstore); //失败
    // const s3 = useStore();
    // print(debug, "switch back again, store 3 is:", s3, s3 == s2); //true

    //这样能还原, 但其他组件可能无法正常使用.
    // comWrapper.app.use(stdstore, studentAsTopstoreKey);
    // const s4 = useStore(studentAsTopstoreKey);
    // print(
    //   debug,
    //   "switch back using the same pattern in main.js, store 4 is:",
    //   s4,
    //   s4 == s1 //true
    // );

    // onDeactivated(() => { //和上面一样, 不能真正还原
    //   comWrapper.app.use(stdstore, studentAsTopstoreKey);
    //   const s4 = useStore(studentAsTopstoreKey);
    //   print(
    //     debug,
    //     "switch back using the same pattern in main.js, store 4 is:",
    //     s4,
    //     s4 == s1 //true
    //   );
    // });
    //#endregion
    return {
      i18nKeys,
      i18nResult,
      showToast,
      switchStore,
    };
  },
});
</script>

<summary>
  View形式的组件，还需要到/router/index.ts中注册，在App.vue的适当位置设置链接
</summary>
