<style src="../../css/chat.css"></style>

<template>
  <div class="chatapp">
    <thread-section></thread-section>
    <message-section></message-section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ThreadSection from "./ThreadSection.vue";
import MessageSection from "./MessageSection.vue";

export default defineComponent({
  name: "App",
  components: {
    ThreadSection,
    MessageSection,
  },
});
</script>
