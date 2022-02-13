<template>
  <accordion-hull
    header="编程式导航:所有其他导航方法都会返回一个 Promise，
        让我们可以等到导航完成后才知道是成功还是失败"
  >
    <accordion-item caption="导航到不同的位置">
      <ul>
        <li>
          <span>使用router.push方法向history栈添加一个新的记录</span>
          <input type="button" :value="paths1[0]" @click="demo1" />
        </li>
        <li>
          <span>上面按钮操作，与这里的声明式链接是一样的</span>
          <router-link to="/about" title="回到关于">回到关于</router-link>
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="push参数还可以是对象" show>
      <li>
        <span>带有路径的对象</span>
        <input type="button" :value="JSON.stringify(paths1[1])" @click="demo1" />
      </li>
      <li>
        <span>命名的路由</span>
        <input type="button" :value="JSON.stringify(paths1[2])" @click="demo1" />
      </li>
      <li>
        <span>如果name和path不对应咋办：报错，且不动作</span>
        <input type="button" :value="JSON.stringify(paths1[3])" @click="demo1" />
      </li>
      <li>
        <span>命名路由，并加上参数</span>
        <input type="button" :value="JSON.stringify(paths1[4])" @click="demo1" />
      </li>
      <li>
        <span>上面基础上，再加上查询参数</span>
        <input type="button" :value="JSON.stringify(paths1[5])" @click="demo1" />
      </li>
      <li>
        <span>带有hash的路径</span>
        <input type="button" :value="JSON.stringify(paths1[6])" @click="demo1" />
      </li>
      <li>
        <span>如果提供了path，则params会被忽略。此时需要提供带参数的path</span>
        <input type="button" :value="JSON.stringify(paths1[7])" @click="demo1" />
      </li>
    </accordion-item>
    <accordion-item caption="替换当前位置">
      <ul>
        <li>
          <span> 声明式： </span>
          <router-link to="/exercise/component-base" replace
            >组件基础，使用to attr</router-link
          >
        </li>
        <li>
          <span>编程式</span>
          <input type="button" :value="paths2[0]" @click="demo2" />
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="横跨历史：类似于window.history.go(n)">
      <input type="button" value="退后3步" @click="demo3(-3)" />
      <input type="button" value="前进2步" @click="demo3(2)" />
    </accordion-item>
    <accordion-item caption=""> </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouteLocationRaw, useRoute, useRouter } from "vue-router";
import AccordionHull from "@/components/accordion/accordion-hull.vue";
import AccordionItem from "@/components/accordion/accordion-item.vue";
import router from "@/router";
import { DomEvent } from "@vue/test-utils/dist/constants/dom-events";
export default defineComponent({
  setup() {
    const router = useRouter();
    const paths1 = [
      "/about",
      { path: "/exercise/class-style-bind" },
      { name: "teleport-apply" },
      { name: "teleport-apply123", path: "/exercise/teleport-apply" },
      { name: "user-with-id-name", params: { id: 108, name: "guoshi" } },
      {
        name: "user-with-id-name",
        params: { id: 108, name: "guoshi" },
        query: { plan: "private" },
      },
      {
        path: "/exercise/event-handle",
        hash: "#nosuchhash",
      },
      { path: "/exercise/users/119/guoshi国师" },
    ];
    const paths2 = ["/exercise/component-base"];

    return {
      paths1,
      paths2,
    };
  },
  props: {},
  methods: {
    demo1(evt: Event) {
      const param = this.calcParam(evt);
      router.push(param as RouteLocationRaw);
    },
    demo2(evt: Event) {
      const param = this.calcParam(evt);
      //router.replace(param as RouteLocationRaw);
      //routeLocation 中增加一个属性 replace: true,实现同样效果
      //因为这里返回的是string,就不考虑object了。
      router.push({
        path: param as string,
        replace: true,
      });
    },
    demo3(step: number) {
      //router.forward()和router.back()均是一步
      router.go(step);
    },

    calcParam(evt: Event) {
      const ipt: HTMLInputElement = evt.target as HTMLInputElement;
      let param: string | unknown;
      try {
        param = JSON.parse(ipt.value);
      } catch (error) {
        param = ipt.value;
      }
      //    console.log(param);
      return param;
    },
  },
  components: {
    AccordionHull,
    AccordionItem,
  },
});
</script>

<style lang="scss" scoped></style>
