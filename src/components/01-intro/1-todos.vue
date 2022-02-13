<template>
  <div>
    <h3>代办事项</h3>
    <ul class="test" v-if="todos && todos.length">
      <li :key="todo.id" v-for="todo in todos">
        <!-- v-bind:key-->
        {{ todo.id }}---{{ todo.content }}----{{ todo.done ? "done" : "pend" }}
      </li>
    </ul>
    <span v-else> 没有待办事项 </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
type TheTodo = {
  id: number;
  content: string;
  done: boolean;
};
export default defineComponent({
  props: {
    todos: {
      type: Object as PropType<Array<TheTodo>>,
      default: undefined,
      required: false,
    },
  },
});
</script>
