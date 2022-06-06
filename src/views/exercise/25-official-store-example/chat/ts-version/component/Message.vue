<template>
  <li class="message-list-item">
    <h5 class="message-author-name">{{ message?.speaker }}</h5>
    <div class="message-time">
      {{ time(message?.timestamp as number) }}
    </div>
    <div class="message-text">{{ message?.text }}</div>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ChatMessage from "../api/ChatMessage.class";
export default defineComponent({
  name: "Message",
  props: {
    message: Object as PropType<ChatMessage>,
  },
  setup() {
    return {
      time: (value: number) => new Date(value).toLocaleTimeString(),
    };
  },
});
</script>
