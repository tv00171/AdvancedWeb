const mongoose = require('mongoose');

const ItemConversationIDSchema = new mongoose.Schema({
    conversationID : {
        type: mongoose.Types.ObjectId,
        required: true
    },
    itemID : {
        type: Number,
        required: true
    }
});

const userConversationSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    userID: Number,
    //conversations : [mongoose.Schema.Types.ObjectId],
    conversations : [ItemConversationIDSchema]

});

module.exports = mongoose.model('userConversations', userConversationSchema)
