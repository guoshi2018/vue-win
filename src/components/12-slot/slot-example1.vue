<template>
  <div>
    <h4>{{ title }}</h4>
    <slot> 备用内容：default content </slot>
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
