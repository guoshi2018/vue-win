<template>
  <div>
    <!-- official document is thus:		
    <div v-for="todo in todos" :key="todo.id" data-test="todo">
      {{ todo.text }}
    </div>
-->
    <ul>
      <li
        v-for="todo in todos"
        :key="todo.id"
        data-test="todo"
        :class="[todo.completed ? 'completed' : '']"
      >
        {{ todo.text }}
        <input
          type="checkbox"
          v-model="todo.completed"
          data-test="todo-checkbox"
        />
      </li>
    </ul>
    <form data-test="form" @submit.prevent="createTodo">
      <input data-test="new-todo" v-model="newTodo" />
    </form>
  </div>
</template>

<script>
export default {
  name: "TodoApp",

  data() {
    return {
      todos: [
        {
          id: 1,
          text: "Learn Vue.js 3",
          completed: false,
        },
        {
          id: 2,
          text: "cook a dinner",
          completed: false,
        },
      ],
      newTodo: "the default thing.",
    };
  },
  methods: {
    createTodo() {
      this.todos.push({
        id: this.todos.length + 1,
        text: this.newTodo,
        completed: false,
      });
    },
  },
};
</script>
