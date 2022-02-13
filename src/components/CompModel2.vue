<template>
  <div>
    <h3>{{ title }}</h3>
  </div>
</template>

<script lang="ts">
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  defineComponent,
} from "vue";

export default defineComponent({
  data() {
    return {
      title: "hello",
    };
  },
  setup() {
    onBeforeMount(() => {});
    onMounted(() => {});
    onBeforeUpdate(() => {});
    onUpdated(() => {});
    onBeforeUnmount(() => {});
    onUnmounted(() => {});
  },
});
</script>
