<template>
  <div class="accordion accordion-flush test">
    <!--
    <h2 v-if="header?.length > 0">{{ header }}</h2>-->
    <h2>{{ header.length ? header : "请设置header以标识总标题" }}</h2>
    <slot> 暂无内容 </slot>
  </div>
</template>

<script lang="ts">
//import { Options, Vue } from "vue-class-component";
import { defineComponent } from "vue";
//import Func from "@/common/mixins/func.vue"; //ok,but production failed
import { guidString as gs } from "@/common/mixins/func"; //ok

export default defineComponent({
  //  mixins: [Func],
  mounted() {
    //console.log("accordion mounting... improved with vue.defineComponent");
    //这是拥有$el属性的最早的钩子
    if (!this.$el.id) {
      this.$el.id = gs();
      //本想采用Vue的自定义机制，但经验证：在mounted事件里，Vue的$emit方法没效果。
      //故采用传统的dom方法：创建并初始化，派发
      this.fireCustomEvent("id-changed");
    }
  },
  data() {
    return {
      selfId: "",
    };
  },
  props: {
    header: {
      type: String,
      required: false,
      default: "",
    },
  },
  methods: {
    fireCustomEvent(name: string): void {
      //三步曲虽然仍可用，但已废弃：
      //https://developer.mozilla.org/zh-CN/docs/Web/API/Event/initEvent
      //const evt = document.createEvent("HTMLEvents");
      //evt.initEvent(name, false, false);
      //this.$el.dispatchEvent(evt);

      //现在是两步曲：
      //https://developer.mozilla.org/zh-CN/docs/Web/API/Event/Event
      const evt = new Event(name, {
        bubbles: false,
        cancelable: false,
        composed: false,
      });
      this.$el.dispatchEvent(evt);
    },
  },
});
</script>
