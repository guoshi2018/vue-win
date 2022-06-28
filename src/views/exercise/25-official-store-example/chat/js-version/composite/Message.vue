<template>
  <li class="message-list-item">
    <h5 class="message-author-name">{{ message.authorName }}</h5>
    <div class="message-time">
      {{ time(message.timestamp) }}
    </div>
    <div class="message-text">{{ message.text }}</div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Message",
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      time: (value: number) => new Date(value).toLocaleTimeString(),
    };
  },
});
</script>
