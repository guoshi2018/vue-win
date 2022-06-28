// Full spec-compliant TodoMVC with localStorage persistence
// and hash-based routing in ~120 effective lines of JavaScript.

// localStorage persistence


// app Vue instance
const app = Vue.createApp({
	// app initial state
	data() {
		return {
			todos: todoStorage.fetch(),
			newTodo: "",
			editedTodo: null,
			visibility: "all",
		};
	},

	// watch todos change for localStorage persistence
	watch: {
		todos: {
			handler(todos) {
				todoStorage.save(todos);
			},
			deep: true,
		},
	},

	// computed properties
	// http://vuejs.org/guide/computed.html
	computed: {
		filteredTodos() {
			return filters[this.visibility](this.todos);
		},
		remaining() {
			return filters.active(this.todos).length;
		},
		allDone: {
			get() {
				return this.remaining === 0;
			},
			set(value) {
				this.todos.forEach((todo) => {
					todo.completed = value;
				});
			},
		},
	},

	// methods that implement data logic.
	// note there's no DOM manipulation here at all.
	methods: {
		pluralize(n) {
			return n === 1 ? "item" : "items";
		},
		addTodo() {
			var value = this.newTodo && this.newTodo.trim();
			if (!value) {
				return;
			}
			this.todos.push({
				id: todoStorage.uid++,
				title: value,
				completed: false,
			});
			this.newTodo = "";
		},

		removeTodo(todo) {
			this.todos.splice(this.todos.indexOf(todo), 1);
		},

		editTodo(todo) {
			this.beforeEditCache = todo.title;
			this.editedTodo = todo;
		},

		doneEdit(todo) {
			if (!this.editedTodo) {
				return;
			}
			this.editedTodo = null;
			todo.title = todo.title.trim();
			if (!todo.title) {
				this.removeTodo(todo);
			}
		},

		cancelEdit(todo) {
			this.editedTodo = null;
			todo.title = this.beforeEditCache;
		},

		removeCompleted() {
			this.todos = filters.active(this.todos);
		},
	},

	// a custom directive to wait for the DOM to be updated
	// before focusing on the input field.
	// http://vuejs.org/guide/custom-directive.html
	directives: {
		"todo-focus": {
			updated(el, binding) {
				if (binding.value) {
					el.focus();
				}
			},
		},
	},
});

// mount
const vm = app.mount(".todoapp");

// handle routing
function onHashChange() {
	const visibility = window.location.hash.replace(/#\/?/, "");
	if (filters[visibility]) {
		vm.visibility = visibility;
	} else {
		window.location.hash = "";
		vm.visibility = "all";
	}
}

window.addEventListener("hashchange", onHashChange);
onHashChange();
