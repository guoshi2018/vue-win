<template>
  <li
    class="thread-list-item"
    :class="{ active }"
    @click="$emit('switch-thread', thread.id)"
  >
    <h5 class="thread-name">{{ thread.name }}</h5>
    <div class="thread-time">
      {{ time(thread.lastMessage.timestamp) }}
    </div>
    <div class="thread-last-message">
      {{ thread.lastMessage.text }}
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Thread",
  props: {
    thread: {
      type: Object,
      required: true,
    },
    active: Boolean,
  },
  setup() {
    return {
      time: (value:number) => new Date(value).toLocaleTimeString(),
    };
  },
});
</script>
