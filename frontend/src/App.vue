<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup>
import axios from "axios";

axios.interceptors.request.use(function (config) {
  if(localStorage.getItem('user') != null){
    const user = JSON.parse(localStorage.getItem('user'))
    const token  = user.session.session_token
    console.log(token)
    config.headers.authorization =  token;
  }

  return config;
});

</script>
