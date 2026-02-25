// src/router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'

Vue.use(VueRouter)

const routes = [
  { path: '/home', component: Home },
  { path: '/', redirect: '/home' },
  { path: '*', redirect: '/home' }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router