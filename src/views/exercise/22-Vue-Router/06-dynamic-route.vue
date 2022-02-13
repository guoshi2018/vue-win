<template>
  <div ref="root">
    <accordion-hull header="动态路由">
      <accordion-item caption="查看当前路由">
        <h4>curent route count: {{ currentRouteRecords.length }}</h4>
        <input type="button" @click="updateRecords" value="刷新" />
        <ul>
          <li v-for="(rec, i) in currentRouteRecords" :key="i">
            {{ i + 1 }} &lt;{{ rec.name }}&gt; &nbsp;&nbsp;{{ rec.path }}
          </li>
        </ul>
      </accordion-item>
      <accordion-item
        caption="添加路由操作,注意,地址栏输入,路由失败,原因在于程序刷新后重新加载,也就没有该路由了哈"
      >
        <ul>
          <li>
            <span>根级路由:{{ firstPath }}</span>
            <input
              type="button"
              @click="addUniqueRecord(firstPath, firstNewRecName)"
            />
            <input
              type="button"
              @click="codingPushEnter(firstPath)"
              value="push方法编码进入成功"
            />
            <input
              type="button"
              @click="codingReplaceEnter(firstPath)"
              value="replace方法编码进入成功"
            />
            <span>链接进入成功:</span
            ><router-link :to="firstPath"></router-link>
          </li>
          <li>
            <span
              >about/mygod子级路由,并带路径参数:{{
                secondPath
              }},但使用的方法不是嵌套路由方式</span
            >
            <input
              type="button"
              @click="addUniqueRecord(secondPath, secondNewRecName)"
              value="添加"
            />
            <input
              type="button"
              @click="codingPushEnter(secondPath)"
              value="push方法编码进入成功"
            />
            <input
              type="button"
              @click="codingReplaceEnter(secondPath)"
              value="Replace方法编码进入成功"
            />
            <span>真实地址链接进入成功:</span
            ><router-link :to="secondRealPath"></router-link>
          </li>
          <li>
            <span>添加嵌套路由</span>
            <span>嵌套路由父级:{{ thirdNewRecParentName }}</span>
            <span>嵌套的路由:{{ thirdNewRecName }}</span>
            <input type="button" @click="addNestRoute" value="添加" />
            <input
              type="button"
              @click="codingPushEnter(thirdNewRecParentPath + thirdPath)"
              value="push方法编码进入成功"
            />
            <input
              type="button"
              @click="codingReplaceEnter(thirdNewRecParentPath + thirdPath)"
              value="Replace方法编码进入成功"
            />
            <span>真实地址链接进入成功:</span
            ><router-link
              :to="thirdNewRecParentPath + thirdRealPath"
            ></router-link>
          </li>
        </ul>
      </accordion-item>

      <accordion-item caption="路由的删除操作">
        <ul>
          <li>
            <span>按名称删除路由：</span>
            <input
              type="button"
              @click="deleteAddedRoutesByName"
              value="删除"
            />
          </li>
          <li>
            <span
              >调用 router.addRoute()
              返回的回调,这种删除方式可能已经被废除</span
            >
            <input
              type="button"
              @click="deleteAddedRoutesByCallback"
              value="删除"
            />
          </li>
          <li>
            <span
              >添加一个名称冲突的路由。如果添加与现有途径名称相同的途径，会先删除路由，再添加路由
              由于本例定义的添加路由逻辑是不添加名称重复的路由.所以,一旦这里删除,后续就无法再添加了.
            </span>
            <input
              type="button"
              @click="deleteAddedRoutesByConflictName"
              value="删除"
            />
          </li>
        </ul>
      </accordion-item>
    </accordion-hull>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import {
  RouteRecordRaw,
  useRouter,
  RouteRecordName,
  RouteRecord,
} from "vue-router";

import AccordionHull from "@/components/accordion/accordion-hull.vue";
import AccordionItem from "@/components/accordion/accordion-item.vue";
import InnerView from "@/components/22-Vue-Router/inner-view.vue";
import PropUser from "@/components/22-Vue-Router/prop-user.vue";

export default defineComponent({
  setup(props) {
    const router = useRouter();
    const currentRouteRecords: RouteRecord[] = reactive([]);

    const firstNewRecName = Symbol.for("first");
    const firstPath = "/x1/y1";

    const secondNewRecName = Symbol.for("second");
    const secondPath = "/about/mygod/:id/:name";
    const secondRealPath = "/about/mygod/101/guoshi";

    const thirdNewRecName = Symbol.for("third");
    const thirdNewRecParentName = "about"; // /about 的name已经设置为"about"
    const thirdNewRecParentPath = "/about/";
    const thirdPath = "settings/long/:x2/:y2/:z2";
    const thirdRealPath = "settings/long/101/hello/289";

    const root = ref();
    onMounted(async () => {
      //其他调用方式见guoshi.js文件使用说明
      const objGuoshi = await import("guoshi-js");
      objGuoshi.guoshi.innerByTarget(root.value);
    });

    const cbRemoving: Array<CallableFunction> = [];

    return {
      root,
      router,
      currentRouteRecords,
      firstNewRecName,
      firstPath,

      secondNewRecName,
      secondPath,
      secondRealPath,

      thirdNewRecName,
      thirdNewRecParentName,
      thirdNewRecParentPath,
      thirdPath,
      thirdRealPath,

      cbRemoving,
    };
  },
  components: {
    AccordionHull,
    AccordionItem,
  },
  methods: {
    //刷新路由记录:
    updateRecords() {
      this.currentRouteRecords.length = 0;
      this.currentRouteRecords.splice(0, 0, ...this.$router.getRoutes());
    },
    //添加不重复的唯一路由
    addUniqueRecord(path: string, name: RouteRecordName) {
      const rec: RouteRecordRaw = {
        path,
        component: InnerView,
        name,
      };
      if (!this.$router.hasRoute(name)) {
        this.cbRemoving.push(this.$router.addRoute(rec)); //为删除做准备
        console.log(`adding record ${path} successfully`);
      } else {
        console.log(`adding record ${path} is ignored.`);
      }
    },

    //编码进入:成功
    codingPushEnter(path: string) {
      //如果你需要等待新的路由显示，可以使用 await router.push()。
      this.$router.push({
        //ok
        path,
      });
    },
    codingReplaceEnter(path: string) {
      //如果你需要等待新的路由显示，可以使用 await router.replace()。
      this.$router.replace({
        //ok history有所不同
        path,
      });
      // this.$router.push({				//同上效果
      //   path,
      //   replace: true,
      // });
    },

    addNestRoute() {
      if (!this.$router.hasRoute(this.thirdNewRecName)) {
        this.cbRemoving.push(
          this.$router.addRoute(this.thirdNewRecParentName, {
            path: this.thirdPath,
            component: InnerView, //在 InnerView PropUser 之间切换 试试
            name: this.thirdNewRecName,
          })
        );
        console.log(`adding record ${this.thirdPath} successfully`);
      } else {
        console.log(`adding record ${this.thirdPath} is ignored.`);
      }
    },

    //删除路由
    deleteAddedRoutesByName() {
      this.$router.removeRoute(this.firstNewRecName);
      this.$router.removeRoute(this.secondNewRecName);
      this.$router.removeRoute(this.thirdNewRecName);
    },
    deleteAddedRoutesByCallback() {
      console.log("cbRemoving....", this.cbRemoving);
      this.cbRemoving.forEach((cb) => {
        cb();
      });
    },
    deleteAddedRoutesByConflictName() {
      this.$router.addRoute({
        path: "/no-use",
        name: this.firstNewRecName,
        component: InnerView,
      });
      this.$router.addRoute({
        path: "/no-use",
        name: this.secondNewRecName,
        component: InnerView,
      });
      this.$router.addRoute({
        path: "/no-use",
        name: this.thirdNewRecName,
        component: InnerView,
      });
    },
  },
});
</script>
