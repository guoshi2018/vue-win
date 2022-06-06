<template>
  <li class="todo" :class="{ completed: todo.done, editing }">
    <div class="view">
      <input
        class="toggle"
        type="checkbox"
        :checked="todo.done"
        @change="toggleTodo(todo)"
      />
      <label v-text="todo.text" @dblclick="editing = true"></label>
      <button class="destroy" @click="removeTodo(todo)">destroy</button>
    </div>
    <input
      class="edit"
      v-show="editing"
      :value="todo.text"
      ref="input"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit"
    />
  </li>
</template>

<script>
import { nextTick } from "vue";
import { createNamespacedHelpers } from "vuex";

const mapHelper = createNamespacedHelpers("JsTodoMvc");
export default {
  name: "Todo",
  props: ["todo"],
  data() {
    return {
      editing: false,
    };
  },
  // directives: {
  //   focus(el, { value }, { context }) {
  //     if (value) {
  //       context.$nextTick(() => {
  //         el.focus();
  //       });
  //     }
  //   },
  // },
  watch: {
    editing(v) {
      v &&
        nextTick(() => {
          this.$refs.input.focus();
        });
    },
  },
  methods: {
    ...mapHelper.mapActions(["editTodo", "toggleTodo", "removeTodo"]),
    doneEdit(e) {
      const value = e.target.value.trim();
      const { todo } = this;
      if (!value) {
        this.removeTodo(todo);
      } else if (this.editing) {
        this.editTodo({
          todo,
          value,
        });
        this.editing = false;
      }
    },
    cancelEdit(e) {
      e.target.value = this.todo.text;
      this.editing = false;
    },
  },
};
</script>
