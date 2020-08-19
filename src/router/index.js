import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export const constantRouterMap = [
  {
    path: '',
    component: () => import('@/views/wx/auth/index')
  },
  {
    path: '/share',
    component: () => import('@/views/wx/share/index')
  },
  {
    path: '/code',
    component: () => import('@/views/wx/code/index')
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/report',
    component: () => import('@/views/report/index'),
    meta: {
      title: '健康报告'
    }
  },
  {
    path: '/report/:id',
    component: () => import('@/views/report/detail'),
    meta: {
      title: '报告详情'
    }
  },
  {
    path: '/404',
    component: () => import('@/views/404')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new Router({
  mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

router.beforeEach((to, from, next) => {
  // const pathArr = to.path.split('/')
  next()
})

export default router
