<template>
  <div id="message-app">
    <message-list :messages="messages" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import MessageList from "./message-list.vue";
export default defineComponent({
  name: "messageapp",
  data: () => ({
    messages: ["Hey John", "Howdy Paco"],
  }),
  components: {
    MessageList,
  },
});
</script>
