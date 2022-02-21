<template>
  <div>
    <header>
      <slot name="header" />
    </header>
    <main>
      <!--省略name屬性的插槽，自动生成 name='default'-->
      <slot />
    </main>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: "no-title",
      required: false,
    },
  },
});
</script>
