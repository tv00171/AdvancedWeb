<template>
  <Header />
  <v-container>
    <h1>{{ generatePageName() }}</h1>
    <v-form @submit.prevent="submitForm">
      <v-text-field v-model="productForm.name" label="Name"></v-text-field>
      <v-text-field
        v-model="productForm.description"
        label="description"
      ></v-text-field>
      <v-text-field
        v-model="productForm.price"
        label="price"
        type="number"
      ></v-text-field>
      <v-btn type="submit">Submit</v-btn>
    </v-form>
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
      productForm: {
        name: "",
        description: "",
        price: 0.0,
      },
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    submitForm: async function () {
      const { action } = this.$route.params;
      if (action === "edit") {
        await axios.post("http://localhost:5555/products/edit", {
          ...this.productForm,
          product_id: this.productForm.id,
          name: this.productForm.name,
        });
      } else if (action === "create") {
        await axios.post("http://localhost:5555/products/create", {
          ...this.productForm,
        });
      }

      this.$router.push("/products");
    },
    fetchProducts: async function () {
      let {id } = this.$route.params;

      let response = await axios.get("http://localhost:5555/products/getPost", {
        params:{
          post_id: id
        }
      });

      const responseData = await response.data.data;
      this.productForm = responseData;
    },
    generatePageName() {
      const { action } = this.$route.params;

      switch (action) {
        case "create":
          return "Create a Product";
        case "edit":
          return "Edit Product";
        default:
          return "No action found";
      }
    },
  },
};
</script>
