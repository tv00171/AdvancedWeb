// Composables
import {createRouter, createWebHistory} from 'vue-router'
import CancelView from '../views/CancelView.vue'
import SuccessView from '../views/SuccessView.vue'

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
    name: 'home',
    component: () => import('@/views/Home.vue'),
  },

  {
    path: '/products',
    component: () => import('@/views/ProductList.vue'),
  },

  {
    path: '/preview/product/:post_id',
    component: () => import('@/views/ProductView.vue'),
  },

  {

    path: '/product/:action/:id?',
    component: () => import('@/views/ProductForm.vue'),
  },

  {
    path: '/success',
    name: 'success', component: SuccessView
  },

  {
    path: '/messaging/:id?',
    component: () => import('@/views/Messaging.vue'),
  },

  {
    path: '/cancel',
    name: 'cancel', component: CancelView
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
