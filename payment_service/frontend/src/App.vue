<script setup>
import { RouterLink, RouterView } from 'vue-router'
import StripePayment from './components/StripePayment.vue'
import Success from './components/Success.vue'
import Cancel from './components/Cancel.vue'
</script>

<template>
  <div>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/success">Success</RouterLink>
      <RouterLink to="/cancel">Cancel</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>



