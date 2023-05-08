<template>
  <div id="chat-container">
    <div id="chat-content" style="overflow-y: scroll;">
      <div v-for="(message, index) in messages" :key="index">
        <p v-if="message.userID == loggedUserId" class="sent-message">{{ message.message }}</p>
        <p v-else class="received-message"> {{ message.message }}</p>
      </div>
    </div>
    <v-divider color="black" thickness="3"></v-divider>

    <div id="chat-input">
      <input v-model="inputMessage" placeholder="Send a message..." type="text">
      <v-btn @click="sendMessage">
        <v-icon icon="mdi-send"></v-icon>
      </v-btn>
      <!--      <font-awesome-icon id="sendButton" :icon="['fas', 'paper-plane']" @click="sendMessage"/>-->
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ChatContainer',
  data() {
    return {
      messages: [],
      inputMessage: '',
      loggedUserId: null
    }
  },
  props: {
    conversationID: String
  },
  watch: {
    conversationID: function () {
      this.getMessages();
    },
    inputMessage: function () {
    }
  },
  methods: {
    async getMessages() {
      const currentConversation = this.conversationID;
      try {
        const APICall = 'http://localhost:3000/inbox/' + currentConversation;
        const response = await axios.get(APICall)
        this.messages = response.data.messages;
      } catch (e) {

      }
    },
    async sendMessage() {
      const currentMessage = this.inputMessage;
      const currentConversationId = this.conversationID;
      const requestBody = {
        message: currentMessage,
        conversationID: currentConversationId
      };

      try {
        const APICall = 'http://localhost:3000/userConversations/sendMessage';
        const response = await axios.post(APICall, requestBody);
        // Handle the response as needed

        // Clear the input field after sending the message
        this.inputMessage = '';

        //refresh chat
        const currentConversation = this.conversationID;
        const refreshChat = 'http://localhost:3000/inbox/' + currentConversation;
        // Make the API call to retrieve the messages
        const response2 = await axios.get(refreshChat)
        this.messages = response2.data.messages;
      } catch (error) {
      }
      await this.getMessages();
    },
  },
  async mounted() {
    this.loggedUserId = JSON.parse(localStorage.getItem('user')).id
    const currentConversation = this.conversationID;
    // Make the API call to retrieve the messages
    try {
      if (currentConversation != null && currentConversation != undefined) {

        const APICall = 'http://localhost:3000/inbox/' + currentConversation;
        let response = await axios.get(APICall)
        this.messages = response.data.messages;
      }
    } catch (e) {
    }
  }
}
</script>

<style scoped>
#chat-container {
  width: 75%;
  height: 100%;
  margin: 10px;
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
}

#chat-input {
  width: 100%;
  height: 100%;
  /*background-color: black;*/
  height: 50px;
  display: flex;
  position: relative;
}

#chat-input input {
  width: 100%;
  border-radius: 50px;
  margin: 10px;
  padding-left: 10px;
  padding-right: 30px;
}

#chat-input input:focus {
  outline: none;
}

#chat-input svg {
  position: absolute;
  color: white;
  /*background-color: black;*/
  padding: 5px;
  border-radius: 20px;
  top: 27%;
  right: 1%;
  transition: color 0.2s;
}

#chat-input svg:hover {
  cursor: pointer;
  color: rgb(39, 126, 240);
}

#chat-content {
  height: 75vh;
  flex-direction: column;
  overflow: scroll;
}

.sent-message {
  margin: 5px 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #dcf8c6;
  max-width: 500px;
  display: inline-flex;
}

.received-message {
  margin: 5px 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #f4f4f4;
  align-self: flex-start;
  display: inline-flex;

}
</style>
