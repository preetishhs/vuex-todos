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
          @keyup.enter="addTodo"
          :disabled="disableInput"
        />
      </header>
      <section class="main" v-show="todoList.length">
        <ul class="todo-list">
          <li
            v-for="(item, index) in todoList"
            class="todo"
            :key="item.id"
            :class="{ completed: item.completed}"
            @click="toggleState(item.id)"
          >
            <div class="view">
              <label> {{ item.title }}</label>
              <button class="destroy" @click.stop="removeTodo(index)"></button>
            </div>
          </li>
        </ul>
      </section>
       <footer class="footer" v-show="todoList.length">
        <div class="total" >
          Items: {{todoList.length}}
        </div>
        <button @click="addItemFromWeb"> Async Add </button>
        <div class="completed">
          Completed: {{completedList.length}}
        </div>
      </footer>
    </div>
  </section>
</template>

<script>

import { mapGetters, mapMutations, mapActions, mapState } from 'vuex';

export default {
  name: 'app',
  data() {
    return {
      disableInput: false
    };
  },

  computed: {
    ...mapGetters(['completedList']),
    ...mapState({
      todoList: state => state.todos
    })
  },

  methods: {
    ...mapMutations([
      'addItem', 
      'togglecompletion',
      'removeItem',
      ]),
    
    ...mapActions([
      'addItemFromWeb'
    ]),

    toggleState(index) {
      return this.togglecompletion(index);
    },
    addTodo(event) {
      if (!event.target.value.trim()) {
        return;
      }
      this.addItem(event.target.value);
     event.target.value = '';
    },
    removeTodo: function(index) {
      this.removeItem(index);
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

