<template>
  <v-card class="card" outlined>
    <v-responsive aspect-ratio="1.5">
      <img
        :src="item.image || fallbackImage"
        :alt="item.name"
        class="responsive-image"
        @error="useFallbackImage"
      />
    </v-responsive>
    <v-card-title>{{ item.name }}</v-card-title>
    <v-card-subtitle>{{ item.price }}</v-card-subtitle>
    <v-card-actions>
      <v-btn text small color="primary" @click="$emit('view-more', item)">
        View More
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  data() {
    return {
      fallbackImage: 'https://via.placeholder.com/300x200',
    };
  },
  methods: {
    useFallbackImage(event) {
      event.target.src = this.fallbackImage;
    },
  },
};
</script>

<style scoped>
.card {
  max-width: 300px;
}

.responsive-image {
  width: 100%;
  height: auto;
}

.v-card-actions {
  display: flex;
  justify-content: center;
}
</style>
