<template>
  <div class="thread-section">
    <button @click="test">teset</button>
    <span>{{ tempCp }}</span>
    <div class="thread-count">
      <span v-show="unreadCount"> Unread threads: {{ unreadCount }} </span>
    </div>
    <ul class="thread-list">
      <thread
        v-for="thread in threads"
        :key="thread.id"
        :thread="thread"
        :active="thread.id === currentThread.id"
        @switch-thread="switchThread"
      >
      </thread>
    </ul>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import Thread from "./Thread.vue";
import { js_chat } from "../../../const";
import { stores } from "../../../store-helper";

export default defineComponent({
  name: "ThreadSection",
  components: { Thread },
  setup() {
    const store = useStore();
    return {
      threads: computed(
        () => store.getters[`${stores.js_chat.ns}/${js_chat.getter.threads}`]
      ),
      currentThread: computed(
        () =>
          store.getters[`${stores.js_chat.ns}/${js_chat.getter.currentThread}`]
      ),
      unreadCount: computed(
        () =>
          store.getters[`${stores.js_chat.ns}/${js_chat.getter.unreadCount}`]
      ),
      switchThread: (id) =>
        store.dispatch(
          `${stores.js_chat.ns}/${js_chat.action.switchThread}`,
          id
        ),
    };
  },
  methods: {
    test() {
      console.clear();
      console.log("....", this);
    },
  },
  computed: {
    tempCp() {
      return "guoshi niudun";
    },
  },
});
</script>
