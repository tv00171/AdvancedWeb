const mongoose = require('mongoose');

const userConversationSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    conversations : [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('userConversations', userConversationSchema)