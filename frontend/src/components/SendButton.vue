<template>
    <button @click="onClick()" :style="{ background: color }" class="btn">
      <p>Send</p>
    </button>
  </template>
  
  <script>
  export default {
    name: 'SendButton',
    props: {
      text: String,
      color: String,
    },
    methods: {
      onClick() {
        this.$emit('btn-click')
      },
    },
  }
  </script>

  <style>
  
.btn {
  display: inline-block;
  background-color: burlywood;
  color: #fff;
  border: none;
  padding: 2px 5px;
  margin: 1px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-block {
  display: block;
  width: 100%;
}
  </style>
  