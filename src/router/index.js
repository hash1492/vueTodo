import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Todos from '@/components/Todos'
import * as firebase from '../firebase/config'
var firebaseAuth = firebase.firebaseAuth

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        firebaseAuth.onAuthStateChanged(function (user) {
          if (user) {
            next({name: 'todos'})
          } else {
            next()
          }
        })
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: (to, from, next) => {
        firebaseAuth.onAuthStateChanged(function (user) {
          if (user) {
            next({name: 'todos'})
          } else {
            next()
          }
        })
      }
    },
    {
      path: '/todos',
      name: 'todos',
      component: Todos,
      beforeEnter: (to, from, next) => {
        firebaseAuth.onAuthStateChanged(function (user) {
          if (!user) {
            next({name: 'login'})
          } else {
            next()
          }
        })
      }
    },
    { path: '*', redirect: '/register' }
  ]
})
