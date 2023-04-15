<script>
import axios from 'axios'
import router from "@/router";

export default {
  data() {
    return {
      valid: true,
      signup_error: null,
      isLoading: false
    }
  },
  methods: {
    // The function to be called when the user presses the login button.
    async onSubmit() {
      const {valid} = await this.$refs.form.validate()
      if (!valid) return;
      try {
        // Set the loading state of the page to true
        this.isLoading = true;

        // Make the api call to login
        const loginResponse = await axios.post('/register', {
          email:  this.$refs.form.email.value,
          password: this.$refs.form.password.value,
          name: this.$refs.form.name.value
        });

        localStorage.setItem('user', JSON.stringify(loginResponse))
        // Push the application to the home page
        await router.push('/home/');
      } catch (e) {
        this.signup_error = e;
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
<template>
  <p>
    <v-alert v-if="signup_error != null" v-model:model-value="signup_error" border class="ma-2" closable type="error"
             variant="tonal">{{ signup_error }}
    </v-alert>
  </p>
  <v-row no-gutters>
    <v-col>
      <v-card color="primary" rounded
              style="border-top-right-radius: 7%; border-bottom-right-radius: 7%;
         " height="100vh">
        <v-card-text>
          <v-img class="ma-2" src="@/assets/signup_image.svg" aspect-ratio="2"></v-img>
          <h2 style="width: 400px;" class="mx-auto mt-6"> Shop with Swift for a seamless and swift experience</h2>
          <p style="width: 400px; font-size: 16px" class="mx-auto mt-6">Access products and services by logging in or
            signing up. Enjoy a personalized experience, exclusive offers, and easy order management. </p>
        </v-card-text>
        <v-card-actions>
          <v-progress-linear style="width: 400px" striped model-value="50"></v-progress-linear>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col>
      <v-img src="@/assets/name_logo.svg" aspect-ratio="6" class="mt-6"></v-img>
      <v-card style="align-self: center" class="ma-auto pa-3" elevation="0" width="550">
        <v-card-title>
          <h1 style="align-self: center; text-align: center" class="ma-auto mt-6">Signup</h1>
        </v-card-title>
        <v-card-subtitle>
          <p style="text-align: center" class="mt-2">
            Enter your email address and password to Sign up.
          </p>
        </v-card-subtitle>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              class="mt-4"
              id="email"
              :rules="[v => !!v || 'Required']"
              label="Email"
              required
              variant="solo"
              color="primary"
              style="border-radius: 30%"
            ></v-text-field>
            <v-text-field
              class="mt-4"
              id="name"
              :rules="[v => !!v || 'Required']"
              label="Name"
              required
              variant="solo"
              color="primary"
              style="border-radius: 30%"
            ></v-text-field>

            <v-text-field
              id="password"
              :rules="[v=> !!v || 'Required',v => (v && v.length >= 2) || 'Too short']"
              label="Password"
              required
              variant="solo"
              color="primary"
              type="password"
            ></v-text-field>
            <v-text-field
              id="repeatPassword"
              :rules="[v=> !!v || 'Required',v => (v && v.length >= 2) || 'Too short', v=>v === this.$refs.form.password.value || 'Passwords must match']"
              label="Repeat Password"
              required
              variant="solo"
              color="primary"
              type="password"
            ></v-text-field>
            <v-btn
              :loading="isLoading"
              class="mx-auto mt-3"
              color="primary"
              @click="onSubmit"
              block
            >
              Sign Up
            </v-btn>
          </v-form>
        </v-card-text>
        <v-card-subtitle class="mt-3">
          Already have an account?
          <a href="/login" style="text-decoration: none;">Login</a>
        </v-card-subtitle>
      </v-card>
    </v-col>

  </v-row>
</template>
