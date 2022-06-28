<template>
  <accordion-hull header="官方实例小聚">
    <accordion-item caption="store的getter/mutation/action在组合模式下的最佳map方式测试">
      <store-map-test></store-map-test>
    </accordion-item>

    <accordion-item caption="classic版">
      <accordion-hull header=" ">
        <accordion-item caption="聊天室">
          <js-classic-chat></js-classic-chat>
        </accordion-item>
        <accordion-item caption="计数器">
          <js-classic-counter></js-classic-counter>
        </accordion-item>
        <accordion-item caption="热计数器">
          <js-classic-hot-counter></js-classic-hot-counter>
        </accordion-item>
        <accordion-item caption="购物车">
          <js-classic-shopping-cart></js-classic-shopping-cart>
        </accordion-item>
        <!---->
        <accordion-item caption="再论mvc-todo">
          <js-classic-todo-mvc></js-classic-todo-mvc>
        </accordion-item>
      </accordion-hull>
    </accordion-item>

    <accordion-item caption="composition版">
      <accordion-hull header=" ">
        <accordion-item caption="聊天室 ">
          <js-composite-chat></js-composite-chat>
        </accordion-item>

        <accordion-item caption="计数器">
          <js-composite-counter></js-composite-counter>
        </accordion-item>
        <accordion-item caption="热计数器">
          <js-composite-hot-counter></js-composite-hot-counter>
        </accordion-item>
        <accordion-item caption="购物车">
          <js-composite-shopping-cart></js-composite-shopping-cart>
        </accordion-item>
        <!-- -->
        <accordion-item caption="再论mvc-todo">
          <js-composite-todo-mvc></js-composite-todo-mvc>
        </accordion-item>
      </accordion-hull>
    </accordion-item>

    <accordion-item caption="ts+composition加强版">
      <accordion-hull header=" ">
        <accordion-item caption="聊天室 ">
          <ts-chat></ts-chat>
        </accordion-item>
        <accordion-item
          caption="计数器, 即使state(){return {count:0}}, 多个计算器状态仍然共享数据"
        >
          <ts-counter></ts-counter>
          <ts-counter></ts-counter>
          <ts-counter></ts-counter>
        </accordion-item>
      </accordion-hull>
    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
import { defineComponent, onDeactivated } from "vue";
import { useStore } from "vuex";

import { regAll, unregAll, stores } from "./store-helper"; //或者 store-helper-suc.js也可
import { js_chat, ts_chat } from "./const";
import { studentAsTopstoreKey } from "@/store/setup";

//各个子store模块的名称集合
import StoreMapTest from "./store-map-test.vue";
import JsClassicChat from "@/views/exercise/25-official-store-example/chat/js-version/classic/App.vue";
import JsCompositeChat from "@/views/exercise/25-official-store-example/chat/js-version/composite/App.vue";
import TsChat from "./chat/ts-version/component/App.vue";
import JsClassicCounter from "./counter/js-version/classic/Counter.vue";
import JsCompositeCounter from "./counter/js-version/composite/Counter.vue";
import TsCounter from "./counter/ts-version/Counter.vue";
import JsClassicHotCounter from "./hot-counter/js-version/classic/CounterControls.vue";
import JsCompositeHotCounter from "./hot-counter/js-version/composite/CounterControls.vue";
import JsClassicShoppingCart from "./shopping-cart/js-version/classic/App.vue";
import JsCompositeShoppingCart from "./shopping-cart/js-version/composite/App.vue";
import JsClassicTodoMvc from "./todo-mvc/js-version/classic/components/App.vue";
import JsCompositeTodoMvc from "./todo-mvc/js-version/composite/components/App.vue";

import { print } from "@/common/mixins/func";
const debug = true;

export default defineComponent({
  components: {
    StoreMapTest,

    JsClassicChat,
    JsCompositeChat,
    TsChat,

    JsClassicCounter,
    JsCompositeCounter,
    TsCounter,

    JsClassicHotCounter,
    JsCompositeHotCounter,

    JsClassicShoppingCart,
    JsCompositeShoppingCart,

    JsClassicTodoMvc,
    JsCompositeTodoMvc,
  },
  setup() {
    print(debug, "composite-index.vue setup start");
    //#region 注册, 初始化,
    //如果是选项式api, 应该在beforeCreate钩子中进行
    const store = useStore(studentAsTopstoreKey);
    regAll(store);

    store.dispatch(`${stores.js_chat.ns}/${js_chat.action.getAllMessages}`);
    store.dispatch(`${stores.ts_chat.ns}/${ts_chat.action.init}`);

    store.dispatch(`JsShoppingCart/products/getAllProducts`);
    //#endregion
    onDeactivated(() => {
      unregAll(store);
    });
  },
});
</script>
