<template>
  <v-toolbar app color="white" dark dense elevation="2" height="90">
    <v-toolbar-title class="logo_size">
      <router-link to="/home">
        <img alt="Logo" height="98" src="@/assets/name_logo.svg"/>
      </router-link>
    </v-toolbar-title>
    <SearchBar class="searchbar"></SearchBar>
    <v-spacer></v-spacer>
    <v-btn class="icon-button" icon @click="$router.push('/messaging/')">
      <v-icon size="26">mdi-message</v-icon>
    </v-btn>
    <router-link to="/products">
      <v-btn class="icon-button" icon>
        <v-icon size="26">mdi-pencil</v-icon>
      </v-btn>
    </router-link>
    <v-btn class="icon-button" icon @click="logout">
      <v-icon size="26">mdi-login-variant</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import SearchBar from '/src/components/SeachBar.vue'
import router from "@/router";

export default {
  methods: {
    router() {
      return router
    },
    logout() {
      localStorage.clear();
      router.push('/login');
    }
  },
  components: {
    SearchBar
  }
}
</script>

<style scoped>
.logo_size {
  padding-left: 50px; /* Adjust this value to set the desired left space */
}

.icon-button {
  margin-right: 20px; /* Adjust this value to set the desired space between the icons */
}

.navheight {
  height: 100px; /* Adjust this value to set the desired navbar height */
}

.nav-content {
  display: flex;
  align-items: center;
  width: 100%;
}
</style>
