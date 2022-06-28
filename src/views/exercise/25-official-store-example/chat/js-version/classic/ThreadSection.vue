<template>
  <div class="thread-section">
    <!---->
    <div class="thread-count">
      <span v-show="unreadCount"> Unread threads: {{ unreadCount }} </span>
    </div>

    <ul class="thread-list">
      <thread
        v-for="thread in threads"
        :key="thread.id"
        :thread="thread"
        :active="thread.id === currentThread.id"
        @switch-thread="varyThread"
      >
      </thread>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Thread from "./Thread.vue";
import { createNamespacedHelpers } from "vuex";
import { stores } from "../../../store-helper";
import { js_chat } from "../../../const";

const mapHelper = createNamespacedHelpers(stores.js_chat.ns);
export default defineComponent({
  name: "ThreadSection",
  mounted: () => {},
  components: {
    Thread,
  },
  computed: mapHelper.mapGetters({
    //不简单采用数组形式,是为了html部分的智能感知
    threads: js_chat.getter.threads,
    currentThread: js_chat.getter.currentThread,
    unreadCount: js_chat.getter.unreadCount,
  }),
  //or:数组形式
  // computed: mapHelper.mapGetters([
  //   js_chat.getter.threads,
  //   js_chat.getter.currentThread,
  //   js_chat.getter.unreadCount,
  // ]),

  methods: mapHelper.mapActions({
    varyThread: js_chat.action.switchThread,
  }),
});
</script>
