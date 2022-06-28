<template>
  <div>
    <h3>{{ title }}</h3>
    <h4>{{ strObj }}</h4>
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
import { print } from "@/common/mixins/func";
const debug = false;

export default defineComponent({
  data() {
    return {
      title: "setup hook demo",
    };
  },
  setup() {
    print(debug,"setup hook demo......");
    const strObj = ref({ age: 18 });
    onBeforeMount(() => {
      print(debug,"setup onBeforeMount...");
    });
    onMounted(() => {
      print(debug,"setup mounted...");
    });
    onBeforeUpdate(() => {
      print(debug,"setup onBeforeUpdate...");
    });
    onUpdated(() => {
      print(debug,"setup onUpdated...");
    });
    onBeforeUnmount(() => {
      print(debug,"setup onBeforeUnmount...");
    });
    onUnmounted(() => {
      print(debug,"setup onMounted...");
    });

    return {
      strObj,
    };
  },
});
</script>
