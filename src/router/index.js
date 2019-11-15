import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {path: '/', redirect:'/home',hidden:true},
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/home', component: () => import('@/views/home/index'), hidden: true},
  {path: '/articleDetail/:id', component: () => import('@/views/home/indexDetail'), hidden: true,name:'articleDetail'},

  {path: '/categories', component: () => import('@/views/home/indexCategories'), hidden: true},
  {path: '/archives', component: () => import('@/views/home/indexArchives'), hidden: true},
  {path: '/tags', component: () => import('@/views/home/indexTags'), hidden: true},
  {path: '/search', component: () => import('@/views/home/indexSearch'), hidden: true},
  
  //const whiteList = ['/login','/home','/articleDetail/:id','/categories','/archives','/tags'] // 不重定向白名单
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  // {
  //   path:'/article/postlist/:pro',
  //   component:Layout,
  //   hidden: true,
  //   name:'Postlist1',
  //   children: [{
  //     path: 'dashboard',
  //     component: () => import('@/views/content/articleList')
  //   }]
  // },
  {
    path: '/content',
    component: Layout,
    redirect: '/content/postlist',
    name: 'Ariticle',
    meta: { title: '内容', icon: 'example' },
    children: [
      {
        path: 'postlist/:pro',
        name: 'Postlist',
        component: () => import('@/views/content/index'),
        meta: { title: '文章管理', icon: 'table' },
        
      },
    
      {
        path: 'commentlist',
        name: 'Comment',
        component: () => import('@/views/content/index'),
        meta: { title: '评论管理', icon: 'tree' }
      },
      {
        path: 'classifylist',
        name: 'Classify',
        component: () => import('@/views/content/index'),
        meta: { title: '分类专栏', icon: 'tree' }
      },
    ]
  },




  {
    path: '/editor',
    component: Layout,
    name: 'editor',
    meta: { title: '编辑器', icon: 'form' },
    children: [
      {
        path: 'Markdown',
        name: 'Markdown',
        component: () => import('@/views/editor/markdown'),
        meta: { title: 'Markdown', icon: 'form' }
      },
      {
        path: 'Richtext',
        name: 'Richtext',
        component: () => import('@/views/editor/richtext'),
        meta: { title: 'Richtext', icon: 'form' }
      },
        ]
  },
  






  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

