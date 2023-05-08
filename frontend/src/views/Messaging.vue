<template>
  <Header/>
  <div class="content-container">
    <InboxContainer :conversation-data=this.conversationData
                    :getConversationID="this.getConversationID"></InboxContainer>
    <ChatContainer :conversationID=currentConversationID></ChatContainer>
  </div>
</template>

<script>
/*import HeaderInbox from './components/HeaderInbox.vue'
import HeaderChat from './components/HeaderChat.vue'*/
import InboxContainer from '../components/ChatInboxContainer.vue';
import ChatContainer from '../components/ChatContainer.vue'
import axios from "axios";
import Header from "@/components/Header.vue";


export default {
  name: 'App',
  components: {
    Header,
    InboxContainer,
    ChatContainer
  },
  data() {
    return {
      activeUser: null,
      currentConversationID: null,
      conversationData: []
    };
  },
  methods: {
    getConversationID(id) {
      this.currentConversationID = id;
      return this.currentConversationID;
    }

  },

  async created() {
    // This will be based on the userID that we get from Toni's microservice
    await axios.get(`http://localhost:3000/userConversations/`).then(response => {
      console.log("Response succesful")
      this.conversationData = response.data.conversations;
      this.currentConversationID = this.conversationData[0]._id
    }).catch(error => {
      console.error(error)
    });

    for (let [i, v] of this.conversationData.entries()) {
      let data = await axios.get("http://localhost:5555/products/getPost", {
        params: {
          post_id: v.itemId
        }
      })
      this.conversationData[i].data = data.data.data;
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');


.navbar {
  background-color: white;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.content-container {
  width: 100vw;
  height: 100%;
  background: rgb(236, 236, 236);
  display: flex;
}

.headers {
  display: flex;
  flex: 1;
}

.header-inbox {
  flex: 1;
  border: 1px solid steelblue;
  width: 30%;
  overflow: auto;
  border-radius: 10px;
  margin-right: 10px;
}

.header-chat {
  flex: 2;
  border: 1px solid steelblue;
  width: 70%;
  overflow: auto;
  border-radius: 10px;
}

.user.active {
  background-color: rgba(0, 0, 0, 0.05);
}

.avatar.active {
  background-color: steelblue;
}

.chat {
  margin: 20px;
}

.chat .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.chat .header .name {
  font-weight: bold;
  font-size: 20px;
}

.chat .messages {
  height: 70vh;
  overflow: auto;
}

.chat .messages .message {
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.05);
}

.chat .messages .message.sent {
  align-self: flex-end;
  background-color: steelblue;
  color: white;
}

.chat .message-input {
  margin-top: 10px;
  display: flex;
}

.chat .message-input input {
  flex: 1;
  margin-right: 10px;
  border-radius: 10px;
  border: none;
  padding: 10px;
  font-size: 16px;
}

.chat .message-input button {
  border: none;
  border-radius: 10px;
  background-color: steelblue;
  color: white;
  padding: 10px 20px;
}
</style>
