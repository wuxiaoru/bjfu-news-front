import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeMain from '../pages/home-main'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component:() => import('../pages/login.vue')
  },
  {
    path: '/home-main',
    component: HomeMain,
    children: [
      {
        meta:{
          title:'新闻列表'
        },
        path: '/news-list',
        component: () => import(/* webpackChunkName: "contributor" */'../pages/contributor/news-list.vue')
      },
      {
        meta:{
          title:'稿件列表'
        },
        path: '/section-list',
        component: () => import(/* webpackChunkName: "editor" */'../pages/editor/section-list.vue')
      },
      {
        meta:{
          title:'稿件详情'
        },
        path: '/section-info',
        name: 'section-info',
        component: () => import(/* webpackChunkName: "editor" */'../pages/editor/section-info.vue')
      },
      {
        meta:{
          title:'预览稿件'
        },
        path: '/preview-section',
        name: 'preview-section',
        component: () => import(/* webpackChunkName: "editor" */'../pages/editor/preview-section.vue')
      },
      {
        meta:{
          title:'审批稿件'
        },
        path: '/approval-section',
        name: 'approval-section',
        component: () => import(/* webpackChunkName: "editor" */'../pages/editor/approval-section.vue')
      },
      {
        meta:{
          title:'添加稿件'
        },
        path: '/add-manuscript',
        name: 'add-manuscript',
        component: () => import(/* webpackChunkName: "contributor" */'../pages/contributor/add-manuscript')
      },
      {
        meta:{
          title:'编辑稿件'
        },
        path: '/edit-manuscript',
        name: 'edit-manuscript',
        component: () => import(/* webpackChunkName: "contributor" */'../pages/contributor/edit-manuscript')
      },
      {
        meta:{
          title:'状态信息'
        },
        path: '/state-info',
        name: 'state-info',
        component: () => import(/* webpackChunkName: "contributor" */'../pages/contributor/state-info')
      },
      {
        meta:{
          title:'文章列表'
        },
        path: '/doc-list',
        component: () => import(/* webpackChunkName: "approve" */'../pages/approve/doc-list')
      },
      {
        meta:{
          title:'状态信息'
        },
        path: '/approve-state-info',
        name: 'approve-state-info',
        component: () => import(/* webpackChunkName: "approve" */'../pages/approve/approve-state-info')
      },
      {
        meta:{
          title:'审批意见'
        },
        path: '/approve-suggestion/:id',
        name: 'approve-suggestion',
        component: () => import(/* webpackChunkName: "approve" */'../pages/approve/approve-suggestion')
      },
      {
        meta:{
          title:''
        },
        path: '/approve-perview-news',
        component: () => import(/* webpackChunkName: "approve" */'../pages/approve/approve-perview-news')
      },
      {
        meta:{
          title:''
        },
        path: '/user-list/:userType',
        component: () => import(/* webpackChunkName: "admin" */'../pages/admin/userList.vue')
      },
      {
        meta:{
          title:''
        },
        path: '/add-user/:userType',
        component: () => import(/* webpackChunkName: "admin" */'../pages/admin/addUser.vue')
      }
    ]
  },
  {title:'',
    path: '/person-info',
    component: () => import('../pages/person-info')
  },
  {title:'',
    path: '/improve-info',
    component: () => import('../pages/improve-info')
  }
]

const router = new VueRouter({
  mode: 'history',
  base:'/',
  routes
})

export default router
