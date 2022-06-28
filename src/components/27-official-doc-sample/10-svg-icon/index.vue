<template>
  <div class="container">
    <main>
      <h1>Sample Vue.js SVG Icon System</h1>
      <regular-icon-exhibition />
      <animated-icon-exhibition />
    </main>
  </div>
</template>
<style lang="scss" scoped>
.container {
  font-family: "Nunito", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #222;
  font-weight: 300;
  background: #f1efef;
  width: 100vw;
  // height: 100vh;
  font-size: 17px;
  main {
    width: 800px;
    margin: 0 auto;
    display: table;
    h1 {
      font-weight: 800;
      color: #5a5a5a;
    }
  }
}
</style>
<script lang="ts">
import { defineComponent } from "vue";
import { getType, print } from "@/common/mixins/func";

import RegularIconExhibition from "./regular-icon-exhibition.vue";
import AnimatedIconExhibition from "./animated-icon-exhibition.vue";
const debug = true;

export default defineComponent({
  components: {
    RegularIconExhibition,
    AnimatedIconExhibition,
  },
});
</script>
