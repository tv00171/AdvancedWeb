const mongoose = require('mongoose');

const userConversationSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: Number,
    conversations: [mongoose.Schema.Types.ObjectId],

});

module.exports = mongoose.model('userConversations', userConversationSchema)
