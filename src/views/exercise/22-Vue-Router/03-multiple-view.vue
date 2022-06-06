<template>
  <accordion-hull header="命名视图">
    <accordion-item caption="同时 (同级) 展示多个视图，结合嵌套路由" show>
      <ul>
        <li>
          <router-link to="/exercise/multiple-view/one"
            >/exercise/multiple-view/one</router-link
          >
        </li>
        <li>
          <router-link to="/exercise/multiple-view/two"
            >/exercise/multiple-view/two</router-link
          >
        </li>
        <li>
          <router-link to="/exercise/multiple-view/three"
            >/exercise/multiple-view/three</router-link
          >
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="自身的route-view.样式不调了，反正就这个意思" show>
      <div class="view-container">
        <router-view name="top" class="top"></router-view>
        <router-view name="left" class="left"></router-view>
        <router-view></router-view>
        <router-view name="right" class="right"></router-view>
        <router-view name="bottom" class="bottom"></router-view>
      </div>
    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import AccordionHull from "@/components/accordion/accordion-hull.vue";
// import AccordionItem from "@/components/accordion/accordion-item.vue";

export default defineComponent({
  components: {},
});
</script>

<style lang="scss" scoped>
.view-container {
  position: relative;
  border: green solid 1px;

  .bottom,
  .top,
  .left,
  .right {
    position: absolute;
  }
  .bottom {
    bottom: 3em;
  }
  .top {
    top: 3em;
  }
  .left {
    left: 0.3em;
  }
  .right {
    right: 0.3em;
  }
}
</style>
