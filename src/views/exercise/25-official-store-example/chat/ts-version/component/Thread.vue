<template>
  <li
    class="thread-list-item"
    :class="{ active }"
    @click="$emit('switch-thread', thread?.id)"
  >
    <h5 class="thread-name">{{ thread?.id }}</h5>
    <div class="thread-time">
      {{ time(thread?.newestMessage.timestamp as number) }}
    </div>
    <div class="thread-last-message">
      {{ thread?.newestMessage.text }}
    </div>
  </li>
</template>

<script lang="ts">
import ChatThread from "../api/ChatThread.class";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "Thread",
  props: {
    thread: Object as PropType<ChatThread>,
    active: Boolean,
  },
  setup() {
    return {
      time: (value: number) => new Date(value).toLocaleTimeString(),
    };
  },
});
</script>
