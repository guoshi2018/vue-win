<template>
  <div>
    <h3>this is child-com</h3>
    <p>hello,{{ name }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: String,
  },
});
</script>
