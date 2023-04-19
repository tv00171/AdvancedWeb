<template>
  <v-toolbar app dense color="white" dark elevation="2" height="90">
    <v-toolbar-title class="logo_size">
      <img src="@/assets/name_logo.svg" alt="Logo" height="98"/>
    </v-toolbar-title>
    <SearchBar class="searchbar"></SearchBar>
    <v-spacer></v-spacer>
    <v-btn icon class="icon-button">
      <v-icon size="26">mdi-message</v-icon>
    </v-btn>
    <v-btn icon class="icon-button">
      <v-icon size="26">mdi-pencil</v-icon>
    </v-btn>
    <v-btn icon class="icon-button">
      <v-icon size="26">mdi-account</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import SearchBar from '/src/components/SeachBar.vue'

export default {
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
