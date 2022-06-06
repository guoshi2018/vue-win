<template>
  <accordion-hull header="Vue Router动态路由匹配">
    <accordion-item caption="使用路径参数" show>
      <ol>
        <li>
          <router-link
            to="/exercise/users/101/:johny"
            title="用户johny显示信息"
          />
        </li>
        <li>
          <router-link
            to="/exercise/users/102/mary"
            title="一般展示用户Mary显示信息，不需要带冒号"
          />
        </li>
        <li>
          <router-link
            to="/exercise/no-such-folder/no-such-page"
            title="testing no such page"
          />
          >
        </li>
        <li>
          <router-link
            to="/user-guoshi/hello/world"
            title="testing user-<afterUser(.*)> style"
          />
        </li>
        <li>
          <router-link
            to="/"
            title="根目录算起，无参数.对于本project，被home截获"
          />
        </li>
        <li>
          <router-link to="/one" title="根目录算起，带一个参数one" />
        </li>
        <li>
          <router-link
            to="/one/two/three"
            title="根目录算起，带三个参数：one，two,three"
          />
        </li>
        <li>
          <router-link to="/momo/" title="可选参数：0个" />
        </li>
        <li>
          <router-link to="/momo/guoshi" title="可选参数：1个" />
        </li>
        <li>
          <router-link
            to="/momo/guoshi/wo"
            title="可选参数：2个则抛出错误，然后被not found收编。但由于存在其他匹配..."
          />
        </li>
        <li>
          <h3>
            以上都是渲染到顶层的router-view,下面，渲染到组件自身的router-view
          </h3>
        </li>
        <li>
          <router-link
            to="/exercise/rt-dym-match/profile"
            title="试试profile"
          />
        </li>
        <li>
          <router-link to="/exercise/rt-dym-match/posts" title="试试posts" />
        </li>
        <li>
          <router-link
            to="/exercise/rt-dym-match/otherinfo"
            title="试试空的path的作用"
          />
        </li>
      </ol>
    </accordion-item>
    <accordion-item caption="自身的route-view" show>
      <!--   
        嵌套路由。简单说，就是将内容渲染在组件自己的<route-view>里面，
      而不是顶层app.vue定义的<route-view></route-view> 
      -->
      <router-view></router-view>
    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { onMounted, defineComponent } from "vue";
// import AccordionHull from "@/components/accordion/accordion-hull.vue"; // 子组件 @ is an alias to /src
// import AccordionItem from "@/components/accordion/accordion-item.vue";
//import ComUser from "@/components/22-Vue-Router/com-user.vue";

export default defineComponent({
  components: {},
  setup() {
    onMounted(() => {
      const links = document
        .getElementsByTagName("ol")[0]
        .getElementsByTagName("a");
      [].forEach.call(links, (link: HTMLAnchorElement) => {
        if (link.title && link.href) {
          link.innerHTML =
            link.title + ": &nbsp;&nbsp;&nbsp;&nbsp;" + link.href;
        }
      });
    });
  },
  // routes: [
  //   {
  //     path: "/exercise/users/:id/:name", //参数在路径的声明中，需要冒号
  //     name: "user-with-id",
  //     component: ComUser,
  //   },
  // ],
});
</script>

<summary>
  View形式的组件，还需要到/router/index.ts中注册，在App.vue的适当位置设置链接
  若引用到.js文件，使用import时，需要到shims-vue.d.ts中declare一下。
</summary>
