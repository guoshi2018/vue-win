<template>
  <accordion-hull header="进入过渡 & 离开过渡">
    <accordion-item caption="简单例子">
      <button @click="demo1.show = !demo1.show">Toggle</button>
      <transition name="fade">
        <p v-if="demo1.show">hello</p>
      </transition>
    </accordion-item>
    <accordion-item caption="CSS 过渡">
      <button @click="demo2.show = !demo2.show">Toggle render</button>
      <transition name="slide-fade">
        <p v-if="demo2.show">hello,slide-fade</p>
      </transition>
    </accordion-item>
    <accordion-item caption="Css动画">
      <button @click="demo3.show = !demo3.show">Toggle show</button>
      <transition name="bounce">
        <p v-if="demo3.show">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          facilisis enim libero, at lacinia diam fermentum id. Pellentesque
          habitant morbi tristique senectus et netus.
        </p>
      </transition>
    </accordion-item>
    <accordion-item caption="自定义过渡class类名" show>
      >
      <button @click="demo4.show = !demo4.show">Toggle render</button>
      <transition
        name="custom-classes-transition"
        enter-active-class="animated  tada"
        leave-active-class="animated bounceOutRight"
      >
        <p v-if="demo4.show">hello world</p>
      </transition>
    </accordion-item>
    <accordion-item caption="......" show>
      <h2>其余可参看Vue project 相应部分</h2>
    </accordion-item>
  </accordion-hull>
</template>

<script lang="ts">
/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { defineComponent } from "vue";
import AccordionHull from "@/components/accordion/accordion-hull.vue"; // 子组件 @ is an alias to /src
import AccordionItem from "@/components/accordion/accordion-item.vue";

// interface Data {
// }
// type Yyy = {
// };
export default defineComponent({
  data() {
    return {
      demo1: {
        show: true,
      },
      demo2: {
        show: true,
      },
      demo3: {
        show: true,
      },
      demo4: {
        show: true,
      },
    };
  },
  components: {
    AccordionHull,
    AccordionItem,
  },
});
</script>

<style scoped part="demo1">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/*  .fade-enter-to,
  .fade-leave-from{
    opacity:0.3;
    background-color:green;
  }*/
</style>

<style scoped part="demo2">
.slide-fade-enter-active {
  transition: all 1.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 2.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>

<style scoped part="demo3">
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(3.25);
  }

  100% {
    transform: scale(1);
  }
}
</style>

<style scoped lang="scss" part="demo4">
@import "animate-css";
</style>
