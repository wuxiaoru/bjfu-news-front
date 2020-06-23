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
        path: '/section-info',
        name:'section-info',
        component: () => import('../pages/editor/section-info.vue')
      },
      {
        path: '/preview-section',
        name:'preview-section',
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
        path: '/edit-manuscript',
        name: 'edit-manuscript',
        component: () => import('../pages/contributor/edit-manuscript')
      },
      {
        path: '/state-info',
        name: 'state-info',
        component: () => import('../pages/contributor/state-info')
      },
      {
        path: '/doc-list',
        component: () => import('../pages/approve/doc-list')
      },
      {
        path: '/approve-state-info',
        name: 'approve-state-info',
        component: () => import('../pages/approve/approve-state-info')
      },
      {
        path: '/approve-suggestion/:id',
        name: 'approve-suggestion',
        component: () => import('../pages/approve/approve-suggestion')
      },
      {
        path: '/approve-perview-news',
        component: () => import('../pages/approve/approve-perview-news')
      },
      {
        path: '/user-list/:userType',
        component: () => import('../pages/admin/userList.vue')
      },
      {
        path: '/add-user/:userType',
        component: () => import('../pages/admin/addUser.vue')
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
