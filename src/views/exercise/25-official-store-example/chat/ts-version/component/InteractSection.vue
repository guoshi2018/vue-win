<template>
  <div class="thread-section">
    <select v-model="targetThreadId" class="thread-composer">
      <option value="">选择既有线程,或者自动创建新线程</option>
      <option v-for="id in threadIds" :key="id">
        {{ id }}
      </option>
    </select>
  </div>
  <div class="message-section">
    <textarea
      class="message-composer"
      v-model="text"
      @keyup.enter="sendMessage"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch, nextTick, defineComponent } from "vue";
import { useStore } from "vuex";
import { indexicalString, print } from "@/common/mixins/func";

import { ChatMessageOptions } from "../api/options";

import { stores } from "../../../store-helper";
import { ts_chat } from "../../../const";
import { studentAsTopstoreKey } from "@/store/setup";
const debug = false;

export default defineComponent({
  name: "MessageSection",
  setup() {
    const threadIdGen = indexicalString(ts_chat.other.threadIdSpotPrefix);
    const text = ref("");
    const targetThreadId = ref("");

    const store = useStore(studentAsTopstoreKey);
    const threadIds = computed(
      (): string[] => store.getters[`${stores.ts_chat.ns}/${ts_chat.getter.threadIds}`]
    );
    const createMessage = (msgOpt: ChatMessageOptions) =>
      store.dispatch(`${stores.ts_chat.ns}/${ts_chat.action.saveMessageOptions}`, msgOpt);

    const setCurrentThreadById = (id: string) =>
      store.commit(`${stores.ts_chat.ns}/${ts_chat.mutation.setCurrentThread}`, id);

    //如果放在methods中的写法, 见下面.主要区别:
    // text.value -> this.text;
    //store -> this.$store;
    //targetThreadId.value -> this.targetThreadId
    //当然还需要注释掉setup中retrun 的 sendMessage.
    const sendMessage = () => {
      const trimedText = text.value.trim();
      if (trimedText) {
        const th_id = targetThreadId.value || threadIdGen.next().value;
        createMessage({
          text: trimedText,
          hostThreadId: th_id,
        });
        nextTick(() => {
          print(debug, ".......", th_id);
          setCurrentThreadById(th_id);
        });
        text.value = "";
      }
    };
    return {
      text,
      threadIds,
      targetThreadId,
      sendMessage,
    };
  },
  methods: {
    // sendMessage() {
    //   const trimedText = this.text.trim();
    //   //print(debug,targetThreadId.value);
    //   if (trimedText) {
    //     this.$store.commit("TsChatMod/createMessage", {
    //       text: trimedText,
    //       hostThreadId: this.targetThreadId,
    //       //   hostThreadId: targetThreadId,
    //     } as ChatMessageOptions);
    //     this.$store.commit("TsChatMod/setCurrentThread", this.targetThreadId);
    //     this.text = "";
    //   }
    // },
  },
});
</script>
