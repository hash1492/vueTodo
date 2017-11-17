<template>
  <div class="hello">
    Login
    <input type="text" name="" v-model="user.email" value="" placeholder="Email">
    <input type="password" name="" v-model="user.password" value="" placeholder="Password">
    <button type="button" name="button" v-on:keyup.enter="login" v-on:click="login()">Login</button>
  </div>
</template>
<script>

import firebase from 'firebase'

export default {
  name: 'login',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login: function () {
      var self = this
      console.log('login clicked!')
      if (!this.user.email || !this.user.password) {
        alert('email or password missing')
        return 0
      }
      console.log(this.user.email)
      firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
      .then(function (response) {
        console.log(response)
        self.$router.push({name: 'todos'})
      })
      .catch(function (err) {
        console.log(err)
        switch (err.code) {
          case 'auth/user-not-found':
            alert('User not found')
            self.user.email = ''
            self.user.password = ''
            break
          case 'auth/wrong-password':
            alert('Incorrect Password')
            self.user.password = ''
            break
          default:
        }
      })
    }
  }
}
</script>
