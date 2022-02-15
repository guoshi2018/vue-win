<template>
  <ol>
    <li v-for="message in messages">
      {{ message }}
    </li>
  </ol>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "list",
  props: ["messages"],
});
</script>
