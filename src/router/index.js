import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import Home from '../views/Home.vue'

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    // meta:{title:"首页"},
  },
  {
    path: '/tiny',
    name: 'Tiny',
    component: () => import('@/views/tiny.vue'),
    // meta:{title:"首页"},
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( /* webpackChunkName: "about" */ '@/views/About.vue'),
    // meta:{title:"关于"},
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router