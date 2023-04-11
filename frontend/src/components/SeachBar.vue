<template>
  <v-text-field v-model="search" label="Search" prepend-icon="mdi-magnify" @keydown.enter="searchItems" />
</template>

<script>
export default {
  data() {
    return {
      search: '',
    }
  },
  methods: {
    searchItems() {
      // Add your search logic here
    },
  },
}
</script>


