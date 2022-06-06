<style src="../../css/chat.css"></style>

<template>
  <div class="chatapp">
    <thread-section></thread-section>
    <message-section></message-section>
    <interact-section></interact-section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ThreadSection from "./ThreadSection.vue";
import MessageSection from "./MessageSection.vue";
import InteractSection from "./InteractSection.vue";

export default defineComponent({
  name: "App",
  components: {
    ThreadSection,
    MessageSection,
    InteractSection,
  },
});
</script>
