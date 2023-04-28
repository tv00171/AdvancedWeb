import { createRouter, createWebHistory } from 'vue-router'
import StripePaymentView from '../views/StripePaymentView.vue'
import CancelView from '../views/CancelView.vue'
import SuccessView from '../views/SuccessView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      { path: '/success', name: 'success', component: SuccessView },
      { path: '/cancel', name: 'cancel', component: CancelView },
      { path: '/', name: 'home', component: StripePaymentView }
    ]
  });

export default router;

  