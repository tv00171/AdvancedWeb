// Composables
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/signup',
    component: () => import('@/views/Signup.vue'),
  },
  {
    path: '/home',
    component: () => import('@/views/Home.vue'),
  },
  
  {
    path: '/products',
    component: () => import('@/views/ProductList.vue'),
  },
  
  {
    
    path: '/product/:action/:id?',
    component: () => import('@/views/ProductForm.vue'),
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
