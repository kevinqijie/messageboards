import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import mylist from './views/mylist.vue'
import modifylist from './views/modifylist.vue'
import detailslist from './views/detailslist.vue'
import login from './views/login.vue'
import register from './views/register.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/mylist',
      component:mylist
    },
    {
     path:'/modifylist',
     component:modifylist
    },
    {
      path:'/detailslist',
      component:detailslist
    },
    {
      path:'/login',
      component:login
    },
    {
      path:'/register',
      component:register
    }
  ]
})
