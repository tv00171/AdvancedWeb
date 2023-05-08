<script>
import ConversationHeader from '../components/ChatConversationHeader.vue';

export default {
  name: 'InboxContainer',
  components: {
    ConversationHeader
  },
  data() {
    return {
      currentHeaderClass: "item-container-inactive"
    }
  },
  props: {
    conversationData: null,
    getConversationID: Function
  },
  watch: {
    conversationID: function () {
      this.getMessages();
    }
  },
  methods: {},
  mounted() {

  }
}

</script>


<template>
  <div id="inbox-container">
    <div id="inbox-header">
      <h1>Inbox</h1>
      <font-awesome-icon :icon="['fas', 'inbox']"/>
    </div>
    <div id="inbox-content">
      <ul style="overflow: scroll; height: 100%">
        <li v-for="conversation in conversationData" :key="conversation._id">
          <ConversationHeader :currentHeaderClass=currentHeaderClass :itemName=conversation.data?.name
                              :itemSrc=conversation.itemSrc :resetHeaderClasses=resetConversationHeaderClass
                              @click="getConversationID(conversation._id)"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

#inbox-container {
  width: 25%;
  height: 100%;
  margin: 10px;
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
}

#inbox-header {
  width: 100%;
  height: 50px;
  background: black;
  display: flex;
  justify-content: space-between;
}

#inbox-header h1 {
  margin: 0;
  color: white;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 20px;
}

#inbox-header svg {
  color: white;
  vertical-align: middle;
  height: 100%;
  padding-right: 10px;
  width: 20px;
}

#inbox-content {
  height: 75vh;
}
</style>
