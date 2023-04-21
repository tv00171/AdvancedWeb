<template>
  <v-card class="card" outlined>
    <v-card-title>{{ item.name }}</v-card-title>
    <v-card-subtitle>Price: {{ item.price }}</v-card-subtitle>
    <v-card-text>{{ item.description }}</v-card-text>
    <v-card-actions>
      <v-btn color="primary">Buy Now</v-btn>
    </v-card-actions>
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
