import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeMain from '../pages/home-main'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home-main'
  },
  {
    path: '/home-main',
    component: HomeMain,
    children: [
      {
        path: '/news-list',
        component: () => import('../pages/contributor/news-list.vue')
      },
      {
        path: '/add-manuscript',
        component: () => import('../pages/contributor/add-manuscript')
      },
      {
        path: '/common-table',
        component: () => import('../components/table/common-table')
      },
      {
        path: '/template',
        component: () => import('../pages/template1')
      },
      {
        path: '/form',
        component: () => import('../pages/form-template')
      }
    ]
  },
  {
    path: '/person-info',
    component: () => import('../pages/person-info')
  }
]

const router = new VueRouter({
  routes
})

export default router
