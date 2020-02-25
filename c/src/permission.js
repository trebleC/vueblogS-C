import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login','/home','/articleDetail','/categories','/archives','/tags','/search'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  //console.log(to.path.match(/^\/[\w]*/)[0]); //去掉:id
  if(whiteList.slice(1).indexOf(to.path.match(/^\/[\w]*/)[0]) !== -1 ){
    next()
  }
  else{
  if (getToken()) {
    if (to.path === '/login') {
      NProgress.done()
      next('/admin')
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          next('/admin')

        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('验证失败,请重新登录')
            next({ path: '/login' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }}
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
