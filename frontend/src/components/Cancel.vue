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
      <h4>Oops! Your payment has been cancelled.</h4>
      <p>
        We appreciate your business! If you have any questions, please email us at
        <a href="mailto:orders@example.com">orders@example.com</a>.
      </p>
      <div>
        <v-btn @click="goToHomePage">Go to Home page</v-btn>
      </div>
    </div>
  </template>