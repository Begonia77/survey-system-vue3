import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../pages/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../pages/home.vue'),
      },
      {
        path: 'model',
        name: 'model',
        component: () => import('../pages/model.vue'),
      },
      {
        path: 'paper',
        name: 'paper',
        component: () => import('../pages/paper.vue'),
      },
    ],
  },
  {
    path: '/paper/view',
    name: 'paperView',
    component: () => import('../pages/paper-view.vue'),
  },
  {
    path: '/paper/chatgpt',
    name: 'paperChatgpt',
    component: () => import('../pages/paper-chatgpt.vue'),
  },
  {
    path: '/paper/edit',
    name: 'paperEdit',
    component: () => import('../pages/paper-edit.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../pages/register.vue'),
  },
  {
    path: '/paper/fill',
    name: 'paperFill',
    component: () => import('../pages/paper-fill.vue'),
  },
  {
    path: '/paper/analyse',
    name: 'paperAnalyse',
    component: () => import('../pages/paper-analyse.vue'),
  },
]
// eslint-disable-next-line new-cap
const router = new createRouter({
  history: createWebHashHistory(),
  routes,
})
// 路由守卫，没有登录的不能访问paper相关页面
router.beforeEach((to, from, next) => {
  if (to.name === 'paper' || to.name === 'paperEdit') {
    if (localStorage.getItem('userId'))
      next()
    else
      next('/login')
  }
  else {
    next()
  }
})

export default router
