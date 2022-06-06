//注意，下面的route参数的测试验证，应该在地址栏输入以策简化。

import { RouteLocationNormalized, RouteRecordRaw } from "vue-router";

import ComUser from "@/components/22-Vue-Router/com-user.vue";
import NotFound from "@/components/22-Vue-Router/not-found.vue";
import PropUser from "@/components/22-Vue-Router/prop-user.vue";
import ObjUser from "@/components/22-Vue-Router/obj-user.vue";

import InnerView from "@/components/22-Vue-Router/inner-view.vue";
import HeaderSide from "@/components/22-Vue-Router/named-view/header-side.vue";
import FooterSide from "@/components/22-Vue-Router/named-view/footer-side.vue";
import LeftSide from "@/components/22-Vue-Router/named-view/left-side.vue";
import RightSide from "@/components/22-Vue-Router/named-view/right-side.vue";

import VueRouterDynamicMatch from "@/views/exercise/22-Vue-Router/01-dynamic-match.vue";
import CodingNav from "@/views/exercise/22-Vue-Router/02-coding-nav.vue";
import MultipleView from "@/views/exercise/22-Vue-Router/03-multiple-view.vue";
import RedirectPath from "@/views/exercise/22-Vue-Router/04-redirect-path.vue";
import RouteParamsToProps from "@/views/exercise/22-Vue-Router/05-params-to-props.vue";
import DynamicRoute from "@/views/exercise/22-Vue-Router/06-dynamic-route.vue";



//可以通过扩展 RouteMeta 接口来输入 meta 字段,以此来约束meta必须和可选的元数据
//import "vue-router";  //第三行已经导入
declare module "vue-router" {
  interface RouteMeta {
    // 是可选的
    rm100?: boolean;
    // 每个路由都必须声明
    rm111: string;
  }
}

//不受全局路径route影响
//预计作为某个组件信息的children字段嵌套
//注意： 以 / 开头的嵌套路径将被视为根路径。这允许你利用组件嵌套，而不必使用嵌套的 URL。
const childView: Array<RouteRecordRaw> = [
  {
    // 当 /user/:id/profile 匹配成功
    // ComUser 将被渲染到 父router 的 <router-view> 内部
    path: "profile",
    component: ComUser,
  },
  {
    // 当 /user/:id/posts 匹配成功
    // ComUser 将被渲染到 父router 的 <router-view> 内部
    path: "posts",
    component: ComUser,
  },
  {
    //也许你确实想在那里渲染一些别的东西。在这种情况下，你可以提供一个空的嵌套路径：
    path: "",
    component: ComUser,
  },
];


const routeDemo: Array<RouteRecordRaw> = [
  //路径的匹配
  {
    // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下.pathMatch并非方法
    //括号里是两端省略 / 的常规正则表达式，末尾 * 代表（根目录后）可以有多个参数，例如
    // http://localhost:8080/a/y/z/abc/throw,故pathMatch字段值为一数组
    path: "/:pathMatch(.*)*", //数组形式保存
    name: "NotFound", //name属性，至少在router.resolve方法中有用
    component: NotFound,
  },
  {
    //将匹配以 `/user-` 开头的所有内容，并将其放在 `$route.params.afterUser` 下
    //末尾无 * ，表示，根目录后的所有字符（包括可以有的 / ），全部作为一个字符串
    //保存在afterUser字段里
    path: "/user-:afterUser(.*)",
    name: "userafter",
    component: ComUser,
  },
  {
    //如果你需要匹配具有多个部分的路由，如 /first/second/third，
    //你应该用 *（0 个或多个）和 +（1 个或多个）将参数标记为可重复：
    //将为你提供一个参数数组，而不是一个字符串
    //匹配 /one, /one/two, /one/two/three,等,但user-开头，则匹配上面，因其更特殊
    path: "/:atleastone+",
    name: "atleatone",
    component: ComUser,
  },
  {
    //匹配 /, /one, /one/two, /one/two/three, 等.但特殊性低于上面
    path: "/:zeroormore*",
    name: "zeroormore",
    component: ComUser,
  },
  {
    //id,name参数同时存在时
    path: "/exercise/users/:id/:name", //参数在路径的声明中，需要冒号
    name: "user-with-id-name",
    component: ComUser,
  },
  {
    //可以通过使用 ? 修饰符(0 个或 1 个)将一个参数标记为可选：
    path: "/momo/:username?",
    component: ComUser,
  },

  //下面两个是特殊性（数字）和一般性（任何字符）的路由，
  //却不存在顺序问题（即一般性朝前并不会拦截后面的特殊性）
  {
    //其他：
    path: "/exercise/users/:username",
    component: ComUser,
  },
  {
    //仅存在数值形式的id:
    //确保转义反斜杠( \ )，就像我们对 \d (变成\\d)所做的那样，
    //在 JavaScript 中实际传递字符串中的反斜杠字符。
    path: "/exercise/users/:userid(\\d+)",
    component: ComUser,
  },

  //22-Vue-Router/01-dynamic-match.vue
  {
    path: "/exercise/rt-dym-match",
    name: "vue-router-dynamic-match",
    component: VueRouterDynamicMatch,
    children: childView,
  },
  //22-Vue-Router/02-coding-nav.vue
  {
    path: "/exercise/coding-nav",
    name: "code nav",
    component: CodingNav,
  },

  //一个路径使用多个视图 22-Vue-Router/03-multiple-view.vue
  {
    path: "/exercise/multiple-view",
    component: MultipleView,
    children: [
      {
        path: "one",
        components: {
          top: HeaderSide,
          bottom: FooterSide,
          left: LeftSide,
          right: RightSide,
          default: InnerView,
        },
      },
      {
        path: "two",
        components: {
          bottom: HeaderSide,
          top: FooterSide,
          left: LeftSide,
          right: RightSide,
          default: InnerView,
        },
      },
      {
        path: "three",
        components: {
          top: HeaderSide,
          bottom: FooterSide,
          right: LeftSide,
          left: RightSide,
          default: InnerView,
        },
      },
    ],
  },

  //重定向演练04-redirect-path.vue,使用的是嵌套视图：22-Vue-Router/04-redirect-path.vue"
  {
    path: "/exercise/redirect-path",
    component: RedirectPath,
    name: "redirect-path",
    children: [
      {
        path: "one",
        component: InnerView,
        name: "re-one",
        //别名不能带参数，否则为无效别名
        alias: "/guoshi-mng/123?x=98.4&y=hello",
      },

      {
        path: "two",
        component: InnerView,
        name: "re-two",
        alias: "/niudun/866", //不带参数，可用
      },
      {
        path: "three",
        component: InnerView,
        name: "re-three",
        alias: [
          //提供多个别名
          "you-win/pnp1988",
          "/we-wish/asm989",
        ],
      },
      //如果你的路由有参数，请确保在任何绝对别名中包含它们：
      {
        path: "four/:addr/:sax",
        component: InnerView,
        alias: [
          "mmt/xyz?x=1&y=2", //无效别名
          "/abc/tnt?x=1&y=2", //同上
          "sos",
          "ptp/:x/:y",
        ],
      },
      {
        //说的是这种："泛型”
        path: "five/:id/:name", // /exercise/redirect-path/five/19/bill
        component: InnerView,
        children: [
          {
            path: "profile", // /exercise/redirect-path/five/19/bill/profile
            component: ComUser, //没有component就必须有redirect
            alias: [
              "", // /exercise/redirect-path/five/19/bill
              "explain", // /exercise/redirect-path/five/19/bill/explain
              "/how-are-you/:id/:name", // /how-are-you/19/bill
            ],
          },
        ],
      },
      {
        path: "eleven/one/two",
        redirect: "one", //重定向目标使用指定path标识
      },
      {
        path: "twelve/two/three",
        redirect: {
          name: "re-two", //重定向目标使用name标识
        },
        //component: ComUser, //不要用cmponent,
      },
      {
        path: ":id(\\d+)",
        redirect: (to) => {
          //参数to:目标路由
          const strId = to.params.id;
          let tgt = "three";
          try {
            const id: number = parseInt(strId as string);
            console.log(`id:${id}`);
            tgt = id % 2 ? "one" : "two";
          } catch (err) {
            console.log("non number inputted.so to three");
          }
          return {
            path: tgt,
            query: {
              id: strId,
            },
          };
        },
      },
    ],
  },

  //将route.params设置为组件的props:22-Vue-Router/05-params-to-props.vue
  {
    path: "/exercise/route-params-to-props",
    name: "route-params-to-props",
    component: RouteParamsToProps,
    meta: {
      parentMeta: "we win",
      rm111: "parent say",
      sameNameMeta: "value of parent",
    },
    children: [
      {
        path: "one/:userId/:userName",
        component: PropUser, //单视图组件
        props: true, //布尔模式
      },
      {
        path: "two/:content",
        components: {
          top: HeaderSide,
          bottom: FooterSide,
          left: LeftSide,
          right: RightSide,
        },
        props: {
          //每个命名视图分别定义props设置
          top: true,
          bottom: true,
          left: false,
          right: false,
        },
      },
      {
        path: "three",
        component: PropUser,
        props: {
          //内定好的props，也可以仅指定一些属性
          userId: "1001",
          userName: "wending",
        },
      },
      {
        //当 props 是一个对象时，它将原样设置为组件 props。当 props 是静态的时候很有用。
        //没搞懂
        //https://next.router.vuejs.org/zh/guide/essentials/passing-props.html
        path: "four/:userId/:userName",
        component: ObjUser,
        props: { userInfo: true },
      },
      {
        //函数模式：使用路径参数custom logic for mapping between route and props
        path: "five/:userId/:userName",
        component: PropUser,
        props: (route) => ({
          userId: `7789-${route.params.userId}-0001`,
          userName: `Bill-${route.params.userName}-Gates`,
        }),
      },
      {
        //函数模式：使用查询参数。//顺带路由守卫演练。全局守卫见05-params-to-props.vue
        path: "six",
        component: PropUser,
        props: (route) => ({
          userId: `1234-${route.query.x}-0101`,
          userName: `NewTon-${route.query.y}-Heiniu`,
        }),

        //也可以将一个函数数组传递给 beforeEnter
        //当然也可以通过使用路径 meta 字段和全局导航守卫来实现类似的行为。
        //beforeEnter:[removeQueryParams,removeHash],
        beforeEnter: (to, from) => {
          console.log(
            "/exercise/route-params-to-props/six的独享守卫触发，to=>from"
            // to,
            // from
          );
        },

        //meta
        meta: {
          sixMeta: "you sit",
          sameNameMeta: true, //与parent路由重名，则覆盖之.下同
          rm111: "child say",
        },
      },
    ],
  },

  //动态路由 22-Vue-Router/06-dynamic-route.vue
  {
    path: "/exercise/dynamic-route",
    component: DynamicRoute,
    name: "dynamic-route",
  },
];

function removeQueryParams(to: RouteLocationNormalized) {
  if (Object.keys(to.query).length) {
    return { path: to.path, query: {}, hash: to.hash };
  }
}

function removeHash(to: RouteLocationNormalized) {
  if (to.hash) {
    return { path: to.path, query: to.query, hash: "" };
  }
}


export default routeDemo;
