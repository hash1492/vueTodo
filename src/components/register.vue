<template>
  <div class="hello">
    Login
    <input type="text" name="" value="" v-model="user.email" placeholder="Email">
    <input type="password" name="" value="" v-model="user.password" placeholder="Password">
    <input type="password" name="" value="" v-model="user.confirm_password" placeholder="Confirm Password">
    <button type="button" name="button" v-on:click="register()">Register</button>
  </div>
</template>
<script>
import firebase from 'firebase'

export default {
  name: 'register',
  data () {
    return {
      user: {
        email: '',
        password: '',
        confirm_password: ''
      }
    }
  },
  methods: {
    register: function () {
      var self = this
      console.log('register clicked!')
      if (!this.user.email || !this.user.password) {
        alert('email or password missing')
        return 0
      }
      if (this.user.password !== this.user.confirm_password) {
        alert('password and confirm password dont match')
        return 0
      }
      console.log(this.user.email, this.user.password)
      firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then(function (response) {
        console.log(response)
        self.$router.push({name: 'login'})
      })
      .catch(function (err) {
        console.log(err)
      })
    }
  }
}
</script>
