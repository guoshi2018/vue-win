<template>
  <div ref="root">
    <accordion-hull
      header="将 props 传递给路由组件,以路径params的方式（$router.params),并测试导航卫士"
    >
      <accordion-item
        caption="布尔模式,由于单视图使用默认视图，故后续无name的视图也有渲染.所以实验只看本item内的渲染即可"
        show
      >
        <router-link to="/exercise/route-params-to-props/one/123/williams" />
        <router-view></router-view>
      </accordion-item>

      <accordion-item caption="多个命名视图，包括默认视图" show>
        <router-link
          to="/exercise/route-params-to-props/two/hello-multiple-view"
        />
        <div class="view-container">
          <router-view name="top" class="top"></router-view>
          <router-view name="left" class="left"></router-view>
          <router-view></router-view>
          <router-view name="right" class="right"></router-view>
          <router-view name="bottom" class="bottom"></router-view>
        </div>
      </accordion-item>

      <accordion-item
        caption="路由设置时，包含为指定的path内定好的props.同时演练过渡"
        show
      >
        <router-link to="/exercise/route-params-to-props/three" />
        <!-- 路径组件上使用转场，并对导航进行动画处理 
        更多参见：https://next.router.vuejs.org/zh/guide/advanced/transitions.html
        -->
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </accordion-item>

      <accordion-item
        caption="对象模式：当 props 是一个对象时，它将原样设置为组件 
				props。当 props 是静态的时候很有用。没搞懂"
        show
      >
        <router-link to="/exercise/route-params-to-props/four/233/Jack" />

        <router-view></router-view>
      </accordion-item>

      <accordion-item caption="函数模式" show>
        <ul>
          <li>
            使用路径参数：
            <router-link
              to="/exercise/route-params-to-props/five/1919/Miniton"
            />
          </li>
          <li>
            使用查询参数：
            <router-link
              to="/exercise/route-params-to-props/six?x=7912&y=hey"
            />
          </li>
          <li>
            six页，仅查询参数变化
            <router-link
              to="/exercise/route-params-to-props/six?x=1010&y=world"
            />
          </li>
          <li>
            six页，并未定义路径参数模式，现在点击应该被重定向到前面的乱七八糟定义
            <router-link to="/exercise/route-params-to-props/six/ptd/heylow" />
          </li>
        </ul>
        <router-view></router-view>
      </accordion-item>
    </accordion-hull>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter, RouteLocationRaw } from "vue-router";
import AccordionItem from "@/components/accordion/accordion-item.vue";
import AccordionHull from "@/components/accordion/accordion-hull.vue";
//import { guoshi } from "@/common/js/guoshi.js";

export default defineComponent({
  components: {
    AccordionHull,
    AccordionItem,
  },
  setup() {
    const root = ref();
    onMounted(async () => {
      //其他调用方式见guoshi.js文件使用说明
      const objGuoshi = await import("guoshi-js");
      objGuoshi.guoshi.innerByTarget(root.value);
    });

    //路由守卫演练。独享守卫见route-demo.ts
    //注册一个全局前置守卫
    const router = useRouter();
    router.beforeEach(async (to, from /*next*/) => {
      console.log(
        "05-params-to-props.vue router.beforeEach:from:"
        // from,
        // "to:",
        // to,
        // "now sleep a while..."
      );
      const objGuoshi = await import("guoshi-js");
      const now = await objGuoshi.guoshi.sleep(1000);
      const remainder = now % 3;
      const newTarget = {
        path: "/about",
      } as RouteLocationRaw;
      const action = remainder == 2 ? newTarget : remainder == 1;
      console.log("action:", action);

      //meta测试：
      console.log("非递归合并所有 meta 字段的（从父字段到子字段）：", to.meta);

      //return action;
      return true; //演练与其他卫士钩子的时序。
    });
    //全局解析守卫
    //确保在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被正确调用
    router.beforeResolve(() => {
      console.log("05-params-to-props.vue router.beforeResolve");
    });
    //全局后置钩子,不会接受 next 函数也不会改变导航本身
    router.afterEach((to, from, failures) => {
      console.log(
        "05-params-to-props.vue router.afterEach:" /* to, from, failures*/
      );
    });
    router.onError(() => {
      console.warn("导航卫士发生错误了哦。");
    });
    return {
      root,
    };
  },
  methods: {},
});
</script>
