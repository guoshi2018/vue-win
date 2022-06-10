//注意，下面的route参数的测试验证，应该在地址栏输入以策简化。
import {
  RouteRecordRaw,
} from "vue-router";

//import VuexIntro from "@/views/exercise/23-vuex/01-vuex-intro.vue";
import VuexNS from "@/views/exercise/23-vuex/02-vuex-ns.vue";


const vuexDemo: Array<RouteRecordRaw> = [
  //vuex简介
  // {
  //   path: "/exercise/vuex-intro",
  //   component: VuexIntro,
  //   name: "vuex-intro",
  // },
  //Vuex使用命名空间
  {
    path: '/exercise/vuex-namespace',
    component: VuexNS,
    name: "vuex-namespace",
  },
];

export default vuexDemo;
