<template>
    <div :class="item-container-inactive" @click="handleClick">
        <div class="item-name-container"><h1>{{ itemName }}</h1></div>
        <div class="item-image-container"><img class="item-image" :src="itemSrc" /></div>
    </div>
</template>
  
<script>
  export default {
    name: 'ConversationHeader',
    props: {
      currentHeaderClass: {
        type: String,
        required: true,
        default: 'item-container-inactive',
        
      },
      resetHeaderClasses: {
        type: Function
      },
      itemName: {
        type: String,
        required: true
      },
      itemSrc: {
        type: String,
        default: ''
      }
    },
    data(){
      return {
        headerClass: 'item-container-inactive'
      }
    },
    // watch: {
    //   currentHeaderClass: function (){
    //     this.resetHeaderClasses();
    //   }
    // },
    methods:{
      changeHeaderClass(){
        console.log();
      },
      handleClick(){
        console.log(`Conversation about ${this.itemName} needs to load into chat...`)
      }
    }
  }
</script>

<style scoped>
.item-container-inactive{
    display: flex;
    vertical-align: middle;
    justify-content: center;
    transition: background-color 0.35s;
}
.item-container-inactive:hover{
    background-color: rgb(175, 175, 175);
    color: rgb(0, 0, 0);
    cursor: pointer;
}

.item-container-inactive h1:hover{
    color: rgb(0, 0, 0);
}
.item-name-container{
    width: 80%;
    justify-content: center;
    margin-top: 40px;
    padding-left: 10px;
}
.item-name-container h1{
    font-size: 1rem;
    align-self: center;
    vertical-align: middle;
    height: fit-content;  
    color: inherit;
    transition: color 0.35s;  
}
.item-image{
    width: 80%;
    height: 80%;
    object-fit: cover;
    margin-top: 8px;
    margin-left: 8px;
    border: 2px solid black;
}
.item-image-container{
    height: 100px;
    width: 100px;
    overflow: hidden;
}

</style>