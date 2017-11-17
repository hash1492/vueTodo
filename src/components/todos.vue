<template>
  <div>
    <input type="text" class="new-todo" v-model="todo.name" placeholder="Enter a todo..." value="">
    <button type="button" name="button" v-on:keyup.tab='addTodo' v-on:click="addTodo()">+</button>
    <hr>
    <div class="todo-list">
      <div class="todo-item" v-for="(todo, index) in todos">
        <input type="checkbox" name="" v-if="!todo.edit_mode" value="" v-model="todo.completed">
        <span class="todo-name" v-if="!todo.edit_mode" v-bind:class="{ 'todo-completed': todo.completed }">{{ todo.data().name }}</span>
        <input type="text" v-if="todo.edit_mode" v-model="todo.data().name" name="" value="">
        <button type="button" name="button" v-on:click="deleteTodo(todo.id)">delete</button>
      </div>
    </div>
  </div>
</template>
<script>
import * as firebase from '../firebase/config'
import uuidv4 from 'uuid/v4'
// collections
let todos = firebase.todosCollection

export default {
  name: 'todos',
  data () {
    return {
      todo: {
        name: null
      },
      todos: []
    }
  },
  created: function () {
    var self = this
    console.log('created called')

    // This is for normal query of data without live sync
    // todos.get()
    // .then(function (querySnapshot) {
    //   querySnapshot.forEach(function (doc) {
    //     self.todos.push(doc.data())
    //     console.log(doc.data())
    //   })
    // })

    // This is for live sync
    todos.onSnapshot(function (querySnapshot) {
      console.log('onSnapshot called')
      console.log(querySnapshot)
      self.todos = []
      querySnapshot.forEach(function (doc) {
        self.todos.push(doc)
      })
      console.log(self.todos)
    })
  },
  methods: {
    addTodo: function () {
      console.log('addTodo called')
      // this.todos.push(Object.assign({}, this.todo))
      // this.todo.name = ''
      var self = this
      this.todo.id = uuidv4()
      console.log(this.todo)
      todos.add(Object.assign({}, this.todo))
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id)
        self.todo.name = ''
      })
      .catch(function (error) {
        console.error('Error adding document: ', error)
      })
    },
    deleteTodo: function (id) {
      console.log('delete called')
      // this.todos.splice(index, 1)
      console.log(id)
      todos.doc(id).delete().then(function () {
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
