<template>
  <div ref="root">
    <accordion-hull header="重定向,在route-demo.ts中预定义">
      <accordion-item caption="正常子路径跳转">
        <ul>
          <li>
            <span> 正常to one: </span>
            <router-link to="/exercise/redirect-path/one"></router-link>
          </li>
          <li>
            <span> 正常to two: </span>
            <router-link to="/exercise/redirect-path/two"></router-link>
          </li>
          <li>
            <span> 正常to three: </span>
            <router-link to="/exercise/redirect-path/three"></router-link>
          </li>
        </ul>
      </accordion-item>
      <accordion-item
        caption="一般形式的重定向，此时不需要component属性，因为它永远不会被渲染"
      >
        <ul>
          <li>
            <span> 重定向目标使用指定path标识one: </span>
            <router-link to="eleven/one/two"></router-link>
          </li>
          <li>
            <span> 重定向目标使用name标识re-two: </span>
            <router-link to="twelve/two/three"></router-link>
          </li>
          <li>
            <label>输入用户id</label><input type="number" v-model="userId" />
            <span> 方法重定向：{{ userId }} </span>
            <router-link :to="userId.toString()"></router-link>
          </li>
        </ul>
      </accordion-item>
      <accordion-item caption="别名alias">
        <ul>
          <li>
            <span>
              带查询参数的别名定义，即使原样使用，也无效，然后只会被其他路由截获，或者不显示：
            </span>
            <router-link to="/guoshi-mng/123?x=98.4&y=hello"></router-link>
          </li>
          <li>
            <span> 常规别名： </span>
            <router-link to="/niudun/866"></router-link>
          </li>
          <li>
            <span> 常规别名： </span>
            <router-link
              to="/exercise/redirect-path/you-win/pnp1988"
            ></router-link>
          </li>
          <li>
            <span> 常规别名： </span>
            <router-link to="/we-wish/asm989">
              别名/we-wish/asm989
            </router-link>
          </li>
          <li>
            <span> 带路径参数的原始路由： </span>
            <router-link
              to="/exercise/redirect-path/four/yindu/男"
            ></router-link>
          </li>
          <li>
            <span> 上述路由的别名sos，由于无路径参数声明，非法：</span>
            <router-link
              to="/exercise/redirect-path/sos/beijing/女"
            ></router-link>
          </li>
          <li>
            <span>
              上述路由的别名ptp,由于带路径参数声明,虽然名称与原始路由参数名称不一致，使用时带对应参数，仍然合法可用：</span
            >
            <router-link
              to="/exercise/redirect-path/ptp/nanjing/吃"
            ></router-link>
          </li>
          <li>
            <span>上述合法别名，使用时不带路径参数，非法</span>
            <router-link to="/exercise/redirect-path/ptp"></router-link>
          </li>
        </ul>
      </accordion-item>
      <accordion-item
        caption="如果你的路由有参数，请确保在任何绝对别名中包含它们"
      >
        <ul>
          <li>
            <span>
              原装父视图path,由于子视图profile的path带有""的别名，
              所以该路径实际上与下面路径是一回事，就带有两个router-view显示
            </span>
            <router-link to="/exercise/redirect-path/five/19/bill">
              /exercise/redirect-path/five/19/bill
            </router-link>
          </li>
          <li>
            <span> 使用嵌套子视图原名: </span>
            <router-link to="/exercise/redirect-path/five/20/gates/profile">
              /exercise/redirect-path/five/19/bill/profile
            </router-link>
          </li>
          <li>
            <span> 使用上面的嵌套子视图的别名'explain': </span>
            <router-link to="/exercise/redirect-path/five/21/saqier/explain">
              /exercise/redirect-path/five/21/saqier/explain
            </router-link>
          </li>
          <li>
            <span> 使用上面的嵌套子视图别名，这是采用的根部算起的别名 </span>
            <router-link to="/how-are-you/22/kelindun">
              /how-are-you/22/kelindun
            </router-link>
          </li>
        </ul>
      </accordion-item>
    </accordion-hull>
  </div>

  <div>
    <span>04-redirect-path.vue自身的router-view</span>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "vue";
import AccordionHull from "@/components/accordion/accordion-hull.vue";
import AccordionItem from "@/components/accordion/accordion-item.vue";

export default defineComponent({
  components: {
    AccordionHull,
    AccordionItem,
  },
  setup() {
    const userId = ref(100);
    const root = ref();
    onMounted(async () => {
      //其他调用方式见guoshi.js文件使用说明
      const objGuoshi = await import("guoshi-js");
      objGuoshi.guoshi.innerByTarget(root.value);
    });
    return {
      userId,
      root,
    };
  },
});
</script>
