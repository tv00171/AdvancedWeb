<script>
import axios from 'axios';
import ConversationHeader from './ConversationHeader.vue';
export default{
    name: 'InboxContainer',
    components:{
        ConversationHeader
    },
    data() {
        return {
            conversationData: ["No new messages"],
            currentHeaderClass: "item-container-inactive"
        }
    },
    props:{
        getConversationID: Function
    },    
    watch: {
      conversationID: function (){
        this.getMessages();
      }
    },
    methods: {
    },
    mounted(){
        console.log("inbox has been mounted")
        // This will be based on the userID that we get from Toni's microservice
        axios.get('http://localhost:3000/userConversations/64481c51b2c38c08980e063c').then(response => {
            this.conversationData = response.data.conversations;
            console.log(this.conversationData);
        }).catch(error =>{
            console.error(error)
        });
    }
}

</script>


<template>
    <div id="inbox-container">
        <div id="inbox-header">
            <h1>Inbox</h1>
            <font-awesome-icon :icon="['fas', 'inbox']" />
        </div>
        <div id="inbox-content">
            <ul>
                <li v-for="conversation in conversationData" :key="conversation._id"><ConversationHeader :currentHeaderClass=currentHeaderClass :resetHeaderClasses=resetConversationHeaderClass :itemName=conversation.itemName :itemSrc=conversation.itemSrc @click="getConversationID(conversation._id)" /></li>
            </ul>
        </div>
    </div>
</template>

<style scoped>

#inbox-container{
    width:25%;
    height: 100%;
    margin: 10px;
    background-color: white;
    border-radius: 5px;
    overflow: hidden;
}

#inbox-header{
    width:100%;
    height: 50px;
    background: black;
    display: flex;
    justify-content: space-between;
}
#inbox-header h1{
    margin: 0;
    color: white;
    padding-left: 10px;
    padding-top: 10px;
    font-size: 20px;
}

#inbox-header svg{
    color: white;
    vertical-align: middle;
    height: 100%;
    padding-right: 10px;
    width: 20px;
}

#inbox-content{
    height: 75vh;
}
</style>