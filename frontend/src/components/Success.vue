<script>
import router from '@/router';

export default {
  methods: {
    goToHomePage() {
      router.push({ name: 'home' });
    },
  },
};
</script>

<template>
    <div>
      <h4>Payment Successful</h4>
      <div>
        <v-btn @click="goToHomePage">Go to Home page</v-btn>
      </div>
    </div>
</template>