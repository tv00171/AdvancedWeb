<template>
  <v-app>
  <router-view />
  </v-app>
</template>

<script setup>
  import axios from "axios";
  axios.defaults.baseURL = "http://localhost:4444";
</script>
