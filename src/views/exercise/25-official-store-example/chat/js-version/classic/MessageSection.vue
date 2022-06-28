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
import { defineComponent } from "vue";
import Message from "./Message.vue";
import { createNamespacedHelpers } from "vuex";
import { js_chat } from "../../../const";
import { stores } from "../../../store-helper";

const mapHelper = createNamespacedHelpers(stores.js_chat.ns);
export default defineComponent({
  name: "MessageSection",
  components: { Message },
  data() {
    return {
      text: "",
    };
  },
  computed: mapHelper.mapGetters({
    thread: js_chat.getter.currentThread,
    messages: js_chat.getter.sortedMessages,
  }),
  watch: {
    "thread.lastMessage": function () {
      this.$nextTick(() => {
        const ul = this.$refs.list as HTMLUListElement;
        ul.scrollTop = ul.scrollHeight;
      });
    },
  },
  methods: {
    ...mapHelper.mapActions({
      submitMessage: js_chat.action.sendMessage,
    }),
    sendMessage() {
      const { text, thread, $store } = this;
      if (text.trim().length > 0) {
        // $store.dispatch(`${stores.js_chat.ns}/${js_chat.action.sendMessage}`, {
        //   text,
        //   thread,
        // });
        this.submitMessage({
          text,
          thread,
        });
        this.text = "";
      }
    },
  },
});
</script>
