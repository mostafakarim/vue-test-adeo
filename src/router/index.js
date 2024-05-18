import { createWebHistory, createRouter } from 'vue-router'
import Home from '@/views/Home.vue'
import Article from '@/views/Article.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/article/:query',
    name: 'Article',
    component: Article,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
