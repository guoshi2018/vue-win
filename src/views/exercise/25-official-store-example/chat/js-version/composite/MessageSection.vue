<template>
  <div class="message-section">
    <h3 class="message-thread-heading">{{ thread.name }}</h3>
    <ul class="message-list" ref="list">
      <message v-for="message in messages" :key="message.id" :message="message">
      </message>
    </ul>
    <textarea
      class="message-composer"
      v-model="text"
      @keyup.enter="sendMessage"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { ref, Ref, computed, watch, nextTick, defineComponent } from "vue";
import { useStore, createNamespacedHelpers } from "vuex";
import Message from "./Message.vue";
import { js_chat } from "../../../const";
import { stores } from "../../../store-helper";
import { studentAsTopstoreKey } from "@/store/setup";


export default defineComponent({
  name: "MessageSection",
  components: { Message },
  setup() {
    const list = ref() as Ref<HTMLUListElement>;

    const store = useStore(studentAsTopstoreKey);

    const text = ref("");

    const thread = computed(
      () => store.getters[`${stores.js_chat.ns}/${js_chat.getter.currentThread}`]
    );
    const messages = computed(
      () => store.getters[`${stores.js_chat.ns}/${js_chat.getter.currentMessages}`]
    );
    const submitMessage = (payload: {
      text: string,
      thread:Object,
    }) =>
      store.dispatch(`${stores.js_chat.ns}/${js_chat.action.sendMessage}`, payload);
    watch(
      () => thread.value.lastMessage,
      () => {
        nextTick(() => {
          const ul = list.value;
          ul.scrollTop = ul.scrollHeight;
        });
      }
    );

    function sendMessage() {
      const trimedText = text.value.trim();
      if (trimedText) {
        submitMessage({
          text: trimedText,
          thread: thread.value,
        });
        text.value = "";
      }
    }

    return {
      list,
      text,
      thread,
      messages,
      sendMessage,
    };
  },
});
</script>
