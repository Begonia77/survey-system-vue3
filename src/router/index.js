import { createRouter, createWebHashHistory } from 'vue-router'

const publicRoutes = [
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
]
const router = new createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes,
})

export default router
