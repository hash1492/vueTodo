<template>
  <div>
    <input type="text" class="new-todo" v-on:keyup.enter='addTodo' v-model="todo.name" placeholder="Enter a todo..." value="">
    <button type="button" name="button" v-on:click="addTodo()">+</button>
    <hr>
    <div class="todo-list">
      <div class="todo-item" v-for="(todo, index) in todos">
        <input type="checkbox" v-on:change="updateTodo(todo)" name="" v-if="!todo.edit_mode" value="" v-model="todo.completed">
        <span class="todo-name" v-if="!todo.edit_mode" v-bind:class="{ 'todo-completed': todo.completed }">{{ todo.name }}</span>
        <input type="text" v-if="todo.edit_mode" v-model="todo.name" name="" value="">
        <button type="button" name="button" v-on:click="deleteTodo(todo.id)">delete</button>
      </div>
    </div>
  </div>
</template>
<script>
import * as firebase from '../firebase/config'
// collections
let todosCollection = firebase.todosCollection

export default {
  name: 'todos',
  data () {
    return {
      todo: {
        name: '',
        completed: false
      },
      todos: []
    }
  },
  created: function () {
    var self = this
    todosCollection.onSnapshot(function (querySnapshot) {
      self.todos = []
      querySnapshot.forEach(function (doc) {
        var todo = {
          name: doc.data().name,
          completed: doc.data().completed,
          id: doc.id
        }
        self.todos.push(todo)
      })
    })
  },
  methods: {
    addTodo: function () {
      if (!this.todo.name) {
        return
      }
      var self = this
      todosCollection.add(this.todo)
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id)
        self.todo.name = ''
      })
      .catch(function (error) {
        console.error('Error adding document: ', error)
      })
    },
    updateTodo: function (todo) {
      todosCollection.doc(todo.id)
      .update({completed: todo.completed})
      .then(function () {
        console.log('Document successfully updated!')
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error)
      })
    },
    deleteTodo: function (id) {
      todosCollection.doc(id).delete().then(function () {
        console.log('Document successfully deleted!')
      }).catch(function (error) {
        console.error('Error removing document: ', error)
      })
    }
  }
}
</script>
<style scoped>
  .new-todo {
    font-size: 20px;
    height: 40px;
    padding: 5px;
    margin: 10px;
  }
  .todo-list {
    border: 1px solid rgb(187, 187, 187);
    text-align: left;
  }
  .todo-item {
    padding: 10px;
    border-bottom: 1px solid rgb(187, 187, 187);
  }
  .todo-completed {
    text-decoration: line-through;
  }
</style>
