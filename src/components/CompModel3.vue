<template>
  <div>
    {{ content }}
  </div>
</template>

<script lang="ts">
// 必要时采用/* eslint-disable no-dupe-class-members, no-dupe-keys */
import { defineComponent } from "vue";
import { getType, print } from "@/common/mixins/func";

const debug = true;

export default defineComponent({
  components: {},
  data() {
    return {
      content: "options model component",
    };
  },
});
</script>
