<script>
import { ref } from "vue";
import { loadStripe } from "@stripe/stripe-js";

export default {
  name: "StripePayment",
  setup() {
    const product = ref({
      name: "144Hz Philips Monitor",
      price: 150,
      productOwner: "Kevin Hart",
      description:
        "This is a 144Hz Monitor used only for 2 months. Still new, no scratches.",
      quantity: 1,
    });

    const makePayment = async () => {
      const stripe = await loadStripe(
        "pk_test_51Mw6PuBqA4vdmyT3DGXZ9eBdIRFTPLXPOqR1LfklpaNGOx3FDTEiyR2dF8z3y4KrLYbDRQNtiq9voa4SchcKgCGZ00l0bZae5Q"
      );

      const body = { product: product.value };
      const headers = {
        "Content-Type": "application/json",
      };

      const response = await fetch(
        "http://localhost:8000/api/create-checkout-session",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error);
      }
    };

    return {
      product,
      makePayment,
    };
  },
};
</script>

<template>
  <div>
    <img 
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/MonitorLCDlcd.svg/1024px-MonitorLCDlcd.svg.png"
    alt="Product Image" 
    style="width: 600px; height: 400px;"
    />
    <h1>{{ product.name }}</h1>
    <p>{{ product.description }}</p>
    <button @click="makePayment">Buy Now for {{ product.price }}</button>
  </div>
</template>