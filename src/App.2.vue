<template>
<div>
  <h1>TO DO LIST</h1>
  <section class="todoapp">
  <header class="header">
    <input class="new-todo"
      autofocus autocomplete="off"
      placeholder="What's on your Mind?"
      v-model="newTodo"
      @keyup.enter="addTodo">
  </header>
  <section class="main" v-show="todos.length" v-cloak>
    <ul class="todo-list">
      <li v-for="todo in todos"
        class="todo"
        :key="todo.title"
        :class="{ completed: todo.completed}">
        <div class="view">
          <input class="toggle" type="checkbox" v-model="todo.completed">
          <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
          <button class="destroy" @click="removeTodo(todo)"></button>
        </div>
        <input class="edit" type="text"
          v-model="todo.title"
          v-todo-focus="todo == editedTodo"
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          @keyup.esc="cancelEdit(todo)">
      </li>
    </ul>
  </section>
</section>
</div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      todos: [],
      newTodo: ''
    }
  },

  // methods that implement data logic.
  // note there's no DOM manipulation here at all.
  methods: {
    addTodo: function () {
      var value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.todos.push({
        title: value,
        completed: false
      })
      this.newTodo = ''
    },

    removeTodo: function (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },

    editTodo: function (todo) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
    },

    doneEdit: function (todo) {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo = null
      todo.title = todo.title.trim()
      if (!todo.title) {
        this.removeTodo(todo)
      }
    },

    cancelEdit: function (todo) {
      this.editedTodo = null
      todo.title = this.beforeEditCache
    },

    removeCompleted: function () {
      this.todos = filters.active(this.todos)
    }
  },

  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
