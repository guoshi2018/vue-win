<template>
  <div>
    <h4>代办事项</h4>
    <ul>
      <li v-for="(item, index) in todos" :key="index">
        <!-- 绑定在 <slot> 元素上的 attribute 被称为插槽 prop。 -->
        <slot :item="item" :index="index" :reserve="res"></slot>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      res: "thank you for telling me.",
    };
  },
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
});
</script>
