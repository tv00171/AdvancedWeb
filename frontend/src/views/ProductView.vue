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
              £{{ product.price }}
            </span>
            <v-btn color="primary" variant="outlined" @click="makePayment">Buy Now</v-btn>
            <v-btn color="secondary" variant="outlined">chat with seller</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { ref } from "vue";


export default {
  data() {
    return {
      products: [],
      product: {
        description: "No data",
        id: 7,
        name: "No data",
        price: 500,
      },
    };
  },


  async mounted() {
    await this.fetchProducts();
  },
  methods: {
    makePayment() {
      let product = {
        name: this.product.name,
        price: this.product.price,
        description: this.product.description,
        quantity: 1,
        productOwner: "Kevin Hart",
      }
      const makePayment = async () => {

        const stripe = await loadStripe(
          "pk_test_51Mw6PuBqA4vdmyT3DGXZ9eBdIRFTPLXPOqR1LfklpaNGOx3FDTEiyR2dF8z3y4KrLYbDRQNtiq9voa4SchcKgCGZ00l0bZae5Q"
        );
        const headers = {
          "Content-Type": "application/json",
        };

        let response;
        try{
           response = await axios.post(
            "http://localhost:8000/api/create-checkout-session",
            {
              product,
            },
            {headers: headers}
          );

        }catch (e) {
          console.log(e)
        }
        const session = await response.data;

        console.log("Getting here")

        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          console.log(result.error);
        }
      };

      makePayment();
      return {
        product,
        makePayment,
      };
    },

    fetchProducts: async function () {
      let { post_id } = this.$route.params;

      let response = await axios.get("http://localhost:5555/products/getPost", {
        params: {
          post_id: post_id
        }
      });

      const responseData = await response.data.data;
      console.log(responseData)
      this.product = responseData;
    },
  },
};
</script>
