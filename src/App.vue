<template>
  <!---->
  <header class="placeholder-for-top-tooltip"></header>
  <nav>
    <router-link to="/test/accordion-demo" title="测试风琴组件"
      >AccordionDemo</router-link
    >
    | <router-link to="/" title="首页">Home</router-link> |
    <router-link to="/about" title="关于我们">About</router-link> |
    <router-link to="/weather" title=".net core web api 的简单测试"
      >Weather</router-link
    >
    |
    <router-link to="/exercise/intro" title="1.vue3的简单介绍"
      >Introduce</router-link
    >
    |
    <router-link to="/exercise/model-syntax" title="2.模板语法"
      >ModelSyntax</router-link
    >
    |
    <router-link to="/exercise/data-prop-method" title="3.Data Property和方法"
      >Data-Prop-Method</router-link
    >
    |
    <router-link to="/exercise/calcprop-watch" title="4.计算属性和侦听器"
      >CalcProp-Watch</router-link
    >
    |
    <router-link to="/exercise/class-style-bind" title="5.class和style绑定"
      >ClassStyleBind</router-link
    >
    |
    <router-link to="/exercise/condition-render" title="6.条件渲染"
      >ConditionRender</router-link
    >
    |
    <router-link to="/exercise/list-render" title="7.列表渲染"
      >ListRender</router-link
    >
    |
    <router-link to="/exercise/event-handle" title="8.事件处理"
      >EventHanle</router-link
    >
    |
    <router-link to="/exercise/form-input-bind" title="9.表单输入绑定"
      >FormInputBind</router-link
    >
    |
    <router-link to="/exercise/component-base" title="10.组件基础"
      >ComponentBase</router-link
    >
    |
    <router-link to="/exercise/deep-into-component" title="11.深入组件"
      >DeepIntoComponent</router-link
    >
    | <router-link to="/exercise/slot" title="12.插槽">Slot</router-link> |
    <router-link to="/exercise/provide-inject" title="13.Provide/Inject"
      >Provide/Inject</router-link
    >
    |
    <router-link to="/exercise/provide-inject2" title="13.Provide/Inject2"
      >Provide/Inject2</router-link
    >
    |
    <router-link to="/exercise/template-ref" title="14.Template Reference"
      >TemplateRef</router-link
    >
    |
    <router-link
      to="/exercise/template-ref2"
      title="14.组合式API的Template Reference"
      >TemplateRef2</router-link
    >
    |
    <router-link to="/exercise/tran-anim" title="15.过渡&动画概述"
      >TranAnmi</router-link
    >
    |
    <router-link to="/exercise/enter-leave" title="16.进入过渡&离开過渡"
      >EnterLeave</router-link
    >
    |
    <router-link to="/exercise/combined-api" title="17.组合式API"
      >CombinedAPI</router-link
    >
    |
    <router-link to="/exercise/teleport-apply" title="18.teleport 应用"
      >TeleportApply</router-link
    >
    |
    <router-link to="/exercise/resp-base" title="19.响应性基础"
      >ResponsivityBase</router-link
    >
    |
    <router-link to="/exercise/resp-calc-watch" title="20.响应式计算和侦听"
      >ResponsivityCalcWatch</router-link
    >
    |
    <router-link to="/exercise/ts-support" title="21.Typescript支持"
      >TypescriptSupport</router-link
    >
    |
    <router-link to="/exercise/rt-dym-match" title="22.VueRouter动态路由匹配">
      VueRouterDynamicMatch
    </router-link>
    |
    <!--测试watch的效果-->
    <router-link to="/exercise/users/101/Limu" title="22-1)李牧,观察watch响应">
      LiMu-User
    </router-link>
    |
    <router-link
      to="/exercise/users/208/Leifeng"
      title="22-2)雷锋,观察watch响应"
    >
      Leifeng-User
    </router-link>
    |
    <router-link to="/exercise/coding-nav" title="22-2.编程时导航">
      Coding Navigator
    </router-link>
    |
    <router-link
      to="/exercise/multiple-view"
      title="22-3.命名视图构成多视图布局"
    >
      Multiple Views
    </router-link>
    |
    <router-link to="/exercise/redirect-path" title="22-4.重定向path">
      Redirect Path
    </router-link>
    |
    <router-link
      to="/exercise/route-params-to-props"
      title="22-5.路由参数转为props"
    >
      RouteParams2Props
    </router-link>
    |
    <router-link to="/exercise/dynamic-route" title="22-6.动态路由">
      DynamicRoute
    </router-link>
    |
    <router-link to="/exercise/vuex-intro" title="23-1.vuex简介">
      Vuex-Intro </router-link
    >|
    <router-link to="/exercise/vuex-namespace" title="23-2.vuex使用命名空间">
      Vuex-Namespace
    </router-link>
  </nav>
  <!---->
  <router-view />
  <hr />
  <h4>路由参数的监听方式，参见app.vue和com-user.vue</h4>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  &.placeholder-for-top-tooltip {
    height: 4em;
  }
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
/*
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";*/
@import "bootstrap-css";
@import "exercise-scss";
</style>

<script lang="ts">
import * as bootstrap from "bootstrap-js";
import { defineComponent } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
export default defineComponent({
  //页面点击刷新按钮，失去连接的错误解决方案。但是发现似乎不起作用
  // created() {
  //   //在页面加载时读取sessionStorage里的状态信息
  //   const sessionStorage = window.sessionStorage;
  //   if (sessionStorage.getItem("store")) {
  //     this.$store.replaceState(
  //       Object.assign(
  //         {},
  //         this.$store.state,
  //         JSON.parse(sessionStorage.getItem("store") || "")
  //       )
  //     );
  //   }
  //   //在页面刷新时将vuex里的信息保存到sessionStorage里
  //   window.addEventListener("beforeunload", () => {
  //     sessionStorage.setItem("store", JSON.stringify(this.$store.state));
  //   });
  // },
  created() {
    //选项式API的路由监视。组合式的，见com-user.vue
    this.$watch(
      () => this.$route.params,
      (toParams: any, previousParams: any) => {
        // 对路由变化做出响应...
        console.log(
          "options API <app.vue> created() this.$watch route.params:",
          toParams,
          previousParams
        );
      }
    );
  },
  //暂时没搞懂：使用 beforeRouteUpdate 导航守卫，它也可以取消导航：
  // async onBeforeRouteUpdate(to,from){
  //   await fetchUser(to.params.id);
  // },
  mounted() {
    this.createTooltip();
  },
  // watch:{
  //   router
  // },
  methods: {
    createTooltip(): void {
      const nodes = document.querySelectorAll("[title]");

      //异步也Ok
      nodes.forEach((ele) => {
        ele.setAttribute("data-bs-toggle", "tooltip");
        ele.setAttribute("data-bs-placement", "top");
      });

      //保险起见，使用同步
      //for (const node of nodes) {
      //  node.setAttribute("data-bs-toggle", "tooltip");
      //  node.setAttribute("data-bs-placement", "top");
      //}

      const tooltipTriggerList = [].slice.call(nodes);
      tooltipTriggerList.map(function (trigger) {
        return new bootstrap.Tooltip(trigger);
      });
    },
  },
  components: {},
});
</script>

<!--以下无任何含金量的导出语句，默认就有
<script lang="ts">
  import { Vue as MyVue } from 'vue-class-component'
  export default class MyApp extends MyVue { }
</script>
-->
