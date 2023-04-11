<template>
  <div>
    <Header />
    <v-main>
      <v-container>
        <v-row>
          <v-col v-for="item in items" :key="item.id" cols="12" sm="6" md="4" lg="3">
            <Card :item="item" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Card from '../components/Card.vue';

export default {
  name: 'HomePage',
  components: {
    Header,
    Card,
  },
  data() {
    return {
      items: [
        {
          id: 1,
          name: 'Item 1',
          image: 'path/to/image1.jpg',
          price: '$100',
        },
        // Add more items
      ],
    };
  },
};
</script>


