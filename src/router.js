// import Vue from 'vue'
// import Router from 'vue-router'
// import Home from './views/Home.vue'

// Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
//     }
//   ]
// })


import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Archive from '@/components/archive'
import Login from '@/components/login'
import Upload from '@/components/upload'
import Styleguide from '@/components/styleguide'
import Register from '@/components/register';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/search/:query',
      name: 'Search',
      component: Home
    },
    {
      path: '/screenshot/:slug',
      name: 'Archive',
      component: Archive
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    },
    {
      path:'/styleguide',
      name:'Styleguide',
      component: Styleguide
    },
    {
      path:'/register',
      name:'Register',
      component: Register
    }
  ]
})
