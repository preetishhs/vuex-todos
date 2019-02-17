<template>
  <section>
    <h1>TO DO LIST</h1>
    <div class="todoapp">
      <header class="header">
        <input
          class="new-todo"
          autofocus
          autocomplete="off"
          placeholder="What's on your Mind?"
          v-model="newTodo"
          @keyup.enter="addItem"
        >
      </header>
      <section class="main" v-show="getTodoListComp.length">
        <ul class="todo-list">
          <li
            v-for="(value, index) in getTodoListComp"
            class="todo"
            :key="value.title"
            :class="{ completed: value.completed}"
            @click="toggleState(index)"
          >
            <div class="view">
              <label> {{index + 1}}. {{ value.title }}</label>
              <button class="destroy" @click.stop="removeTodo(index)"></button>
            </div>
          </li>
        </ul>
      </section>
       <footer class="footer" v-show="getTodoListComp.length">
        <div class="total" >
          Items: {{getTodoListComp.length}}
        </div>
        <div class="completed">
          Completed: {{completedList.length}}
        </div>
      </footer>
    </div>
  </section>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      todos: [],
      newTodo: ''
    };
  },
  computed: {
    getTodoListComp() {
      return this.$store.getters.getTodoList;
    },
    completedList() {
      return this.$store.getters.completedList;
    }
  },
  methods: {
    toggleState(index) {
      return this.$store.commit('togglecompletion', index);
    },
    addItem() {
      var value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.$store.commit('addItem', value);
      this.newTodo = '';
    },
    removeTodo: function(index) {
      this.$store.commit('removeItem', index)
    }
  },

  directives: {
    "todo-focus": function(el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  }
};
</script>

