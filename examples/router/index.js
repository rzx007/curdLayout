import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/slide',
    name: 'slide',
    component: () => import(/* webpackChunkName: "slide" */ '../views/slide.vue')
  },
  {
    path: '/dynamic',
    name: 'dynamic',
    component: () => import(/* webpackChunkName: "dynamic" */ '../views/dynamic.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
