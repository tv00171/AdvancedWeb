<script>
import axios from 'axios'
import router from "@/router";

export default {
  data() {
    return {
      valid: true,
      login_error: null,
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
        const loginResponse = await axios.get('/', {
          // email:  this.$refs.form.email.value,
          // password: this.$refs.form.password.value
        });

        localStorage.setItem('user', JSON.stringify(loginResponse))
        // Push the application to the home page
        await router.push('/dashboard/');
      } catch (e) {
        this.login_error = e;
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
<template>
  <p>
    <v-alert v-if="login_error != null" v-model:model-value="login_error" border class="ma-2" closable type="error"
             variant="tonal">{{ login_error }}
    </v-alert>
  </p>
  <v-layout full-height>
    <v-row no-gutters>
      <v-col cols="6" style="height: 100%; width: 100%">
        <v-card color="primary" rounded style="border-top-right-radius: 7%; border-bottom-right-radius: 7%"
                height="100%">
          <v-card-text>
            <v-container fluid style="text-align: center" class="ma-auto">
              <v-img class="ma-2" src="@/assets/login_image.svg" aspect-ratio="2"></v-img>
              <h2 style="width: 400px;" class="mx-auto mt-6"> Shop with Swift for a seamless and swift experience</h2>
              <p style="width: 400px; font-size: 16px" class="mx-auto mt-6">Access products and services by logging in
                or
                signing up. Enjoy
                a personalised experience, exclusive orders and easy order management</p>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col style="align-self: center">
        <v-card class="ma-auto pa-3" elevation="4" height="300" width="600">
          <v-card-title>
            Log in
          </v-card-title>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              id="email"
              :rules="[v => !!v || 'Required']"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              id="password"
              :rules="[v=> !!v || 'Required',v => (v && v.length >= 2) || 'Too short']"
              label="Password"
              required
              type="password"
            ></v-text-field>
            <v-btn
              :loading="isLoading"
              class="mx-auto"
              color="primary"
              @click="onSubmit"
            >
              Login
            </v-btn>
          </v-form>
          <v-card-text class="px-0">
            <a href="/sign-up"> Register
            </a>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>
