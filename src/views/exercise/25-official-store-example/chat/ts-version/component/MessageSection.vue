<template>
  <div class="message-section">
    <h3 class="message-thread-heading">{{ thread.id }}</h3>
    <ul class="message-list" ref="list">
      <message v-for="message in messages" :key="message.id" :message="message">
      </message>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch, nextTick, defineComponent } from "vue";
import { useStore } from "vuex";
import Message from "./Message.vue";
import ChatThread from "../api/ChatThread.class";
import ChatMessage from "../api/ChatMessage.class";

import { stores } from "../../../store-helper";
import { ts_chat } from "../../../const";

export default defineComponent({
  name: "MessageSection",
  components: { Message },
  setup() {
    const list = ref(null);
    const text = ref("");
    const store = useStore();

    const thread = computed(
      (): ChatThread =>
        store.getters[`${stores.ts_chat.ns}/${ts_chat.getter.currentThread}`]
    );
    const messages = computed(
      (): ChatMessage[] =>
        store.getters[`${stores.ts_chat.ns}/${ts_chat.getter.currentMessages}`]
    );
    watch(
      () => thread.value.newestMessage,
      () => {
        nextTick(() => {
          const ul = list.value as unknown as HTMLUListElement;
          ul.scrollTop = ul.scrollHeight;
        });
      }
    );

    return {
      list,
      text,
      thread,
      messages,
    };
  },
});
</script>
