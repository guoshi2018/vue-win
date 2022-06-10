<template>
  <accordion-hull header="官方实例小聚">
    <accordion-item
      caption="store的getter/mutation/action在组合模式下的最佳map方式测试"
    >
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
        <accordion-item caption="再论mvc-todo">
          <js-composite-todo-mvc></js-composite-todo-mvc>
        </accordion-item>
      </accordion-hull>
    </accordion-item>

    <accordion-item caption="ts+composition加强版">
      <accordion-hull header=" ">
        <accordion-item caption="聊天室 ">
          <div>
            <input
              type="button"
              value="测试使用,最终注释掉"
              @click="testTsChat"
            />
          </div>
          <!---->
          <ts-chat></ts-chat>
        </accordion-item>
        <accordion-item
          caption="计数器, 即使state(){return {count:0}}, 多个计算器状态仍然共享数据"
        >
          <ts-counter></ts-counter>
          <ts-counter></ts-counter>
          <ts-counter></ts-counter>
        </accordion-item>
        <accordion-item caption="热计数器,略."> </accordion-item>
        <accordion-item caption="自定义插件测试">
          <button type="button" @click="showToast">toast一把</button>
        </accordion-item>
        <accordion-item caption="购物车(略)"> </accordion-item>
        <accordion-item caption="再论mvc-todo">
          <input id="temp" value="init word" />
        </accordion-item>
      </accordion-hull>
    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { defineComponent } from "vue";
import StoreMapTest from "./store-map-test.vue";

/**
 * 各个子store模块的名称集合
 */
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
  methods: {
    testTsChat: function () {
      console.log("test ts chat start.");
    },
    showToast: function () {
      this.$toast({
        message: "我是toast插件",
        duration: 8000,
        onClose: () => {
          console.log("已关闭");
        },
      });
      //  this.$toast()
    },
  },
});
</script>
