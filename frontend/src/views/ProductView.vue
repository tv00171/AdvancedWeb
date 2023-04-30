<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-img src="https://via.placeholder.com/350x250" alt="Product Image" />
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <h2 class="headline mb-0">{{ product.name }}</h2>
          </v-card-title>

          <v-card-subtitle class="grey--text">
            User Name: Testovici
          </v-card-subtitle>

          <v-card-subtitle class="grey--text">
            Email: test@gmail.com
          </v-card-subtitle>

          <v-divider class="my-4" />

          <v-card-text>
            {{ product.description }}
          </v-card-text>

          <v-card-actions>
            <span class="subtitle-1 font-weight-bold mb-0 mr-2">
              {{ product.price }}$
            </span>
            <v-btn color="primary" variant="outlined">Buy Now</v-btn>
            <v-btn color="secondary" variant="outlined">chat with seller</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
      product: {
        description: "sadsad",
        id: 7,
        name: "asda",
        price: "22.00",
        user_id: 1,
      },
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts: async function () {
      let { id } = this.$route.params;

      let response = await axios.post("/products/get", {
        user_id: 1,
      });

      const responseData = await response.data.data;
      this.products = responseData;

      let productFound = false;

      responseData.map((product) => {
        if (parseInt(product.id) === parseInt(id)) {
          this.product = product;
          productFound = true;
        }
      });

      if (!productFound) {
        this.$router.push("/products");
      }
    },
  },
};
</script>
