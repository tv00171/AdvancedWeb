<template>
  <v-card class="card" outlined>
    <v-img :src="item.image" :alt="item.name" aspect-ratio="1.5" ></v-img>
    <v-card-title>{{ item.name }}</v-card-title>
    <v-card-subtitle>{{ item.price }}</v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: {
    item: Object,
  },
};
</script>

<style scoped>
.card {
  max-width: 300px;
}
</style>
