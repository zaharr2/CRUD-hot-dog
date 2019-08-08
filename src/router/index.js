import Vue from 'vue'
import Router from 'vue-router'

import Home from 'components/hot-dogs/Index'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Home
  }
]

export default new Router({
  routes
})
