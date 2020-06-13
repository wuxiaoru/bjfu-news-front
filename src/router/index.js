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
        path: '/section-list',
        component: () => import('../pages/editor/section-list.vue')
      },
      {
        path: '/preview-section',
        component: () => import('../pages/editor/preview-section.vue')
      },
      {
        path: '/approval-section',
        component: () => import('../pages/editor/approval-section.vue')
      },
      {
        path: '/add-manuscript',
        name: 'add-manuscript',
        component: () => import('../pages/contributor/add-manuscript')
      },
      {
        path: '/state-info',
        name: 'state-info',
        component: () => import('../pages/contributor/state-info')
      },
      {
        path: '/doc-list',
        component: () => import('../pages/approve/doc-list')
      }
    ]
  },
  {
    path: '/person-info',
    component: () => import('../pages/person-info')
  },
  {
    path: '/improve-info',
    component: () => import('../pages/improve-info')
  }
]

const router = new VueRouter({
  routes
})

export default router
