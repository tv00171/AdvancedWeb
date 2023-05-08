const express = require('express')
const router = express.Router()
const UserConversation = require('../models/userConversations')
const Conversation = require('../models/inbox')
const mongoose = require('mongoose')

// Getting all conversations
// router.get('/', async (req, res) =>{
//     try {
//         const conversations = await UserConversation.find();
//         res.json(conversations)
//     } catch (err){
//         res.status(500).json({error: err.message })
//     }
// })

// Getting one conversation
router.get('/', async (req, res) => {
    try {
        let conversationObj;

        try {
            conversationObj = await UserConversation.findOne({userID: res.locals.user.id})
            if (conversationObj == null) {
                return res.status(404).json({message: 'Cannot find conversation'})
            }
        } catch (err) {
            return res.status(500).json({error: err.message})
        }

        const listOfIds = conversationObj.conversations;
        const conversations = await Conversation.find({_id: {$in: listOfIds}});

        const conversationProps = conversations.map((conversation) => {
            return {
                _id: conversation._id,
                itemName: conversation.itemName,
                itemSrc: conversation.itemSrc,
                itemId: conversation.itemID,
            };
        });

        return res.json({"conversations": conversationProps});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Error'})
    }

});

// Creating a conversation ( via Contact seller from Listing microservice)
router.post('/createConversation', async (req, res) => {
    const itemID = req.body.itemID;
    const sellerID = req.body.sellerID;
    const userID = res.locals.user.id;
    const newConversationID = new mongoose.Types.ObjectId();

    try {
        const conversationObj = await UserConversation.findOne({userID: res.locals.user.id})
        if (conversationObj != null) {
            const existingConversation = await Conversation.findOne({
                $and: [
                    {_id: {$in: conversationObj.conversations}},
                    {itemID}
                ]
            });
            if (existingConversation != null) {
                return res.status(409).json({error: 'Conversation already exists item'});
            }
        }
        const conversation = new Conversation({
            itemID: itemID,
            itemSrc: req.body.itemSrc,
            messages: [],
        });

        const newConversation = await conversation.save();

        const existingUserConversations = await UserConversation.findOne({userID});
        const existingSellerConversation = await UserConversation.findOne({userID: sellerID});

        if (existingUserConversations) {
            await UserConversation.updateOne({userID}, {$push: {conversations: newConversation}})
        } else {
            const userConversation = new UserConversation({
                _id: new mongoose.Types.ObjectId(),
                userID: userID,
                conversations: [newConversation]
            });

            await userConversation.save();
        }

        if (existingSellerConversation) {
            await UserConversation.updateOne({userID: sellerID}, {$push: {conversations: newConversation}})
        } else {
            const userConversation = new UserConversation({
                _id: new mongoose.Types.ObjectId(),
                userID: sellerID,
                conversations: [newConversation]
            });

            await userConversation.save();
        }

        return res.status(200).json({message: `Successfully created conversation for ${itemID}`});

    } catch (err) {
        console.log(err)
        return res.status(400).json({error: err.message});
    }
});


//API call to post message
router.post('/sendMessage', async (req, res) => {
    const currentMessage = req.body.message;
    const messageObject = {
        userID: res.locals.user.id,
        message: currentMessage,
        timestamp: Date.now()
    };

    try {
        // Retrieve the conversation ID from the request body or wherever it's available
        const conversationID = req.body.conversationID;

        // Find the conversation by its ID
        const conversation = await Conversation.findByIdAndUpdate(conversationID, {$push: {messages: messageObject}}, {new: true});

        if (!conversation) {
            return res.status(404).json({error: 'Conversation not found'});
        }

        // Append the messageObject to the messages array
        //conversation.messages.push(messageObject);

        // Save the updated conversation
        //const updatedConversation = await conversation.save();

        res.status(200).json({message: "Message sent"});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});


/*
// Update conversation (add messages)
router.patch('/', (req, res) => {

})*/
async function getConversations(listOfIds) {
}

module.exports = router
