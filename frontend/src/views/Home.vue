<template>
  <div>
    <Header />
    <v-main>
      <v-container>
        <v-row>
          <v-col v-for="item in items" :key="item.id" cols="12" sm="6" md="4" lg="3" class="tight-column">
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
          image: '@/assets/name_logo.svg',
          price: '$100',
        },
        {
          id: 1,
          name: 'Item 1',
          image: '@/assets/name_logo.svg',
          price: '$100',
        },
        {
          id: 1,
          name: 'Item 1',
          image: '@/assets/name_logo.svg',
          price: '$100',
        },
        {
          id: 1,
          name: 'Item 1',
          image: '@/assets/name_logo.svg',
          price: '$100',
        },
        // Add more items
      ],
    };
  },
};
</script>

<style scoped>
.tight-column {
  padding-left: 70px;
}
</style>

