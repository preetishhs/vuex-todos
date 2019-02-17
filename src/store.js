import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
var GLOBAL_ID = 1;

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },
  getters: {
    completedList(state) {
      return state.todos.filter(todos => todos.completed === true);
    }
  },
  mutations: {
    addItem(state, payload) {
      state.todos.push({id:GLOBAL_ID++, title: payload, completed: false});
    },
    togglecompletion(state, id) {
      state.todos.forEach( item => {
        if(item.id === id) 
          item.completed = !item.completed;
      })
    },
    removeItem(state, index) {
      state.todos.splice(index, 1);
    }
  },
  actions: {
    addItemFromWeb(context) {
      axios.get('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => {
        console.log(response);
        context.commit('addItem', response.data.title)
      })
      .catch((error) => console.log(error));
    }
  }
})
