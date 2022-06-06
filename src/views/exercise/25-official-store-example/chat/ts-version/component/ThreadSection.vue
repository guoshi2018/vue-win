<template>
  <div class="thread-section">
    <div class="thread-count">
      <span v-show="unreadThreadCount">
        Unread threads: {{ unreadThreadCount }}
      </span>
    </div>
    <ul class="thread-list" ref="list">
      <thread
        v-for="thread in threads"
        :key="thread.id"
        :thread="thread"
        :active="thread.id === currentThread.id"
        @switch-thread="setCurrentThread"
      >
      </thread>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch, nextTick, ref } from "vue";
import { useStore, createNamespacedHelpers } from "vuex";
import Thread from "./Thread.vue";
import ChatThread from "../api/ChatThread.class";

import { stores } from "../../../store-helper";
import { ts_chat } from "../../../const";

export default defineComponent({
  name: "ThreadSection",
  components: { Thread },
  setup() {
    const store = useStore();
    const list = ref(null);

    const threads = computed(
      () => store.getters[`${stores.ts_chat.ns}/${ts_chat.getter.threads}`]
    );
    const currentThread = computed(
      () =>
        store.getters[`${stores.ts_chat.ns}/${ts_chat.getter.currentThread}`]
    );
    const unreadThreadCount = computed(
      () =>
        store.getters[
          `${stores.ts_chat.ns}/${ts_chat.getter.unreadThreadCount}`
        ]
    );
    const setCurrentThread = (id: string) =>
      store.commit(
        `${stores.ts_chat.ns}/${ts_chat.mutation.setCurrentThread}`,
        id
      );

    //将选中线程滚动到适当位置,使之可见
    const perfectView = () => {
      const ul = list.value as unknown as HTMLUListElement;
      const selLi = ul.querySelector("li.active") as HTMLLIElement;
      ul.scrollTop = selLi.offsetTop - ul.scrollHeight;
    };

    //let currentThread = ref(); //这是为了
    //当前线程发生变化,将选中线程滚动到适当位置,使之可见
    watch(
      () => currentThread.value,
      () => {
        nextTick(() => perfectView());
      }
    );
    //暂时找不到合适的事件来解决首次加载时,使当前线程可见
    //onActivated(() => perfectView());
    // onActivated(() => {
    //   console.log("onActived........................");
    // });

    return {
      list,
      threads,
      currentThread,
      unreadThreadCount,
      setCurrentThread,
    };
  },
  methods: {
    temp() {
      console.log("hahaha");
    },
  },
});
</script>
