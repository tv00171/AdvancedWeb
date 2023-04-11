<template>
  <v-text-field
    solo
    rounded
    hide-details
    single-line
    label="Search"
    prepend-inner-icon="mdi-magnify"
    class="rounded-search-bar"
    v-model="searchQuery"
    @input="$emit('input', $event)"
  ></v-text-field>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: '',
    };
  },
};
</script>

<style scoped>
.rounded-search-bar input {
  border-radius: 25px;
}
.rounded-search-bar .v-input__slot {
  border-radius: 25px;
}
</style>
