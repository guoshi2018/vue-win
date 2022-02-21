import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  createWebHashHistory,
} from "vue-router";

import RouterDemo from "@/views/exercise/22-Vue-Router/route-demo";


import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";

import WeatherView from "@/views/WeatherView.vue";
import IntroduceView from "@/views/exercise/01-intro.vue";
import ModelSyntax from "@/views/exercise/02-model-syntax.vue";
import DataPropertyMethod from "@/views/exercise/03-data-property-method.vue"
import CalcPropWatch from "@/views/exercise/04-calcProp-watch.vue";
import ClassStyleBind from "@/views/exercise/05-class-style-bind.vue";
import ConditioinRender from "@/views/exercise/06-condition-render.vue";
import ListRender from "@/views/exercise/07-list-render.vue";
import AccordionDemo from "@/components/accordion/demo.vue";
import EventHanle from "@/views/exercise/08-event-handle.vue";
import FormInputBind from "@/views/exercise/09-form-input-bind.vue";
import ComponentBase from "@/views/exercise/10-component-base.vue";
import DeepIntoComponent from "@/views/exercise/11-deep-into-component.vue";
import Slot from "@/views/exercise/12-slot.vue";
import ProvideInject from "@/views/exercise/13-provide-inject.vue";
import ProvideInject2 from "@/views/exercise/13-provide-inject2.vue";
import TemplateRef from "@/views/exercise/14-template-ref.vue";
import TemplateRef2 from "@/views/exercise/14-template-ref2.vue";
import TranAnim from "@/views/exercise/15-transition-animation.vue";
import EnterLeave from "@/views/exercise/16-enter-leave.vue";
import CombinedApi from "@/views/exercise/17-combined-api.vue";
import TeleportApply from "@/views/exercise/18-teleport-apply.vue";
import RespBase from "@/views/exercise/19-responsivity-base.vue";
import RespCalcWatch from "@/views/exercise/20-responsivity-calc-watch.vue";
import TypescriptSupport from "@/views/exercise/21-ts-support.vue";





const routes: Array<RouteRecordRaw> = [
  {
    path: "/test/accordion-demo",
    name: "accordion-demo",
    component: AccordionDemo,
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutView,
  },
  {
    path: "/weather",
    name: "weather",
    component: WeatherView,
  },
  {
    path: "/exercise/intro",
    name: "intro",
    component: IntroduceView,
  },
  {
    path: "/exercise/model-syntax",
    name: "model-syntax",
    component: ModelSyntax,
  },
  {
    path: "/exercise/data-prop-method",
    name: "data-prop-method",
    component: DataPropertyMethod,
  },
  {
    path: "/exercise/calcprop-watch",
    name: "calcprop-watch",
    component: CalcPropWatch,
  },
  {
    path: "/exercise/class-style-bind",
    name: "class-style-bind",
    component: ClassStyleBind,
  },
  {
    path: "/exercise/condition-render",
    name: "condition-render",
    component: ConditioinRender,
  },
  {
    path: "/exercise/list-render",
    name: "list-render",
    component: ListRender,
  },
  {
    path: "/exercise/event-handle",
    name: "event-handle",
    component: EventHanle,
  },
  {
    path: "/exercise/form-input-bind",
    name: "form-input-bind",
    component: FormInputBind,
  },
  {
    path: "/exercise/component-base",
    name: "component-base",
    component: ComponentBase,
  },
  {
    path: "/exercise/deep-into-component",
    name: "deep-into-component",
    component: DeepIntoComponent,
  },
  {
    path: "/exercise/slot",
    name: "slot",
    component: Slot,
  },
  {
    path: "/exercise/provide-inject",
    name: "provide-inject",
    component: ProvideInject,
  },
  {
    path: "/exercise/provide-inject2",
    name: "provide-inject2",
    component: ProvideInject2,
  },
  {
    path: "/exercise/template-ref",
    name: "template-ref",
    component: TemplateRef,
  },
  {
    path: "/exercise/template-ref2",
    name: "template-ref2",
    component: TemplateRef2,
  },
  {
    path: "/exercise/tran-anim",
    name: "tran-anim",
    component: TranAnim,
  },
  {
    path: "/exercise/enter-leave",
    name: "enter-leave",
    component: EnterLeave,
  },
  {
    path: "/exercise/combined-api",
    name: "combined-api",
    component: CombinedApi,
  },
  {
    path: "/exercise/teleport-apply",
    name: "teleport-apply",
    component: TeleportApply,
  },
  {
    path: "/exercise/resp-base",
    name: "resp-base",
    component: RespBase,
  },
  {
    path: "/exercise/resp-calc-watch",
    name: "resp-calc-watch",
    component: RespCalcWatch,
  },
  {
    path: "/exercise/ts-support",
    name: "ts-support",
    component: TypescriptSupport,
  },
];

//添加测试路由
//routes.splice(-1, 0, ...RouterDemo); //ok,在最后一个元素前插入
routes.push(...RouterDemo); //ok,添加到最后
//console.log('..................', routes);

const router = createRouter({
  //createWebHashHistory:Hash模式。下面是HTML5模式
  history: createWebHistory(process.env.BASE_URL),
  //history: createWebHashHistory(),
  routes,
});

export default router;
