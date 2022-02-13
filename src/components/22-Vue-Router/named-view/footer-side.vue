<template>
  <div class="loc">
    <h2>{{ content }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    content: {
      type: String,
      require: false,
      default: "unknown footer content",
    },
  },
  setup() {},
});
</script>

<style scoped lang="css">
.loc {
  width: 20em;
  background: coral;
}
</style>
