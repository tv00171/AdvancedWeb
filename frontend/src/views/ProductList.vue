<template>
  <Header />
  <v-container>
    <h1>My Products</h1>
    <v-card
      v-for="(product, index) in products"
      :key="index"
      style="margin-bottom: 10px"
    >
      <v-card-title>Name: {{ product.name }}</v-card-title>
      <v-card-title>Description: {{ product.description }}</v-card-title>
      <v-card-title>Price: {{ product.price }}</v-card-title>
      <v-card-actions>
        <v-btn color="primary" @click="editProduct(product.id)">Edit</v-btn>
        <v-btn color="error" @click="deleteProduct(product.id)">Delete</v-btn>
      </v-card-actions>
    </v-card>
    <v-btn color="primary" @click="(e) => createProduct()"
      >Create Product</v-btn
    >
  </v-container>
</template>

<script>
import axios from "axios";
import Header from "../components/Header.vue";
export default {
  watch: {},
  components: { Header },
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    // Fetch products from "/posts"
    this.fetchProducts();
  },
  methods: {
    createProduct() {
      this.$router.push("/product/create");
    },
    fetchProducts: async function () {
      let response = await axios.get("http://localhost:5555/products/get" );

      this.products = await response.data.data;
    },
    editProduct(id) {
      this.$router.push("/product/edit/" + id);
    },
    deleteProduct: async function (id) {
      await axios.post("http://localhost:5555/products/delete", {
        product_id: id,
      });

      this.fetchProducts();
    },
  },
};
</script>
