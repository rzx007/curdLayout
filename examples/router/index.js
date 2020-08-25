import Vue from 'vue'
import VueRouter from 'vue-router'
import routeArr from '@/mock/router.js'
import Home from '../views/Index.vue'

Vue.use(VueRouter)
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
let addRoutes = routeArr.map((item) => {
  return {
    path: item.path,
    name: item.component,
    component: (resolve) => require([`@/views/${item.component}.vue`], resolve)
  }
})
const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/home',
    children: [
      ...addRoutes
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router