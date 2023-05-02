<template>
  <div class="container">
    <NavBar class="navbar" />
    <div class="content-container">
      <InboxContainer :getConversationID=getConversationID />
      <ChatContainer :conversationID=currentConversationID />
    </div>
  </div>
</template>

<script>
/*import HeaderInbox from './components/HeaderInbox.vue'
import HeaderChat from './components/HeaderChat.vue'*/
import InboxContainer from './components/InboxContainer.vue';
import ChatContainer from './components/ChatContainer.vue'
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    InboxContainer,
    ChatContainer
},
  data() {
    return {
      activeUser: null,
      currentConversationID: null
    };
  },
  methods: {
    userSelected(user) {
      this.activeUser = user;
    },
    getConversationID(id){
      this.currentConversationID = id;
      console.log("response from app.vue")
    }
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');

* {
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.navbar {
  background-color: white;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.content-container{
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


