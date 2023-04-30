<template>
  <div>
    <Header />
    <v-main>
      <v-container>
        <v-row v-if="items.length > 0">
          <v-col
            v-for="item in items"
            :key="item.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <Card :item="item" @click="() => viewProduct(item)" />
          </v-col>
        </v-row>
        <h1 v-else>No Items found</h1>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Card from "../components/Card.vue";
import axios from "axios";
import router from "@/router";

export default {
  name: "HomePage",
  components: {
    Header,
    Card,
  },
  data() {
    return {
      items: [
        {
          id: 1,
          name: "Item 1",
          image: "path/to/image1.jpg",
          price: "100",
        },
        // Add more items
      ],
    };
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    viewProduct(product) {
      console.log(product.id);
      router.push(`/preview/product/${product.id}`);
    },
    fetchPosts: async function () {
      let response = await axios.get("/posts");

      console.log(response.data);
      this.items = response.data.data;
    },
  },
};
</script>


