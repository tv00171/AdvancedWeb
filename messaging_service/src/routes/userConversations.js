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
router.get('/:id', getConversationIDs, async (req, res) =>{
    try{
        const listOfIds = res.conversation;
        const conversations = await getConversations(listOfIds);
        console.log(conversations);

        const conversationProps = conversations.map((conversation) =>{
            return{
              _id: conversation._id,
              itemName: conversation.itemName,
              itemSrc: conversation.itemSrc  
            };
        });

        res.json({ "conversations": conversationProps });
    } catch (error){
        console.error(error);
        res.status(500).json({error:'Internal Error'})
    }
    
});

// Creating a conversation ( via Contact seller from Listing microservice)
router.post('/createConversation', async (req, res) => {
    const itemID = req.body.itemID;
    const newConversationID = new mongoose.Types.ObjectId();
    const userID = res.locals.user.id;
    const newConversationItemObj = { conversationID: newConversationID, itemID: itemID };

    try {
        const existingConversation = await Conversation.exists({ itemID });

        if (existingConversation) {
            return res.status(409).json({ error: 'Conversation already exists item' });
        } 
        else {
            const conversation = new Conversation({
                _id: newConversationID,
                itemID: itemID,
                itemSrc: req.body.itemSrc,
                messages: [],
            });

            const newConversation = await conversation.save();

            const existingUserConversations = await UserConversation.exists({  userID });

            if (existingUserConversations) {
                return res.status(409).json({ message: 'Conversation already exists user' });
            } else {
                const userConversation = new UserConversation({
                    _id: new mongoose.Types.ObjectId(),
                    userID: userID,
                    conversations: [newConversationItemObj]
                });

                const newUserConversation = await userConversation.save();
            }

            return res.status(200).json({ message: `Successfully created conversation for ${itemID}` });
        }
    } catch (err) {
        return res.status(400).json({ error: err.message });
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
        const conversation = await Conversation.findByIdAndUpdate(conversationID, {$push:{messages: messageObject}}, {new: true});

        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        // Append the messageObject to the messages array
        //conversation.messages.push(messageObject);

        // Save the updated conversation
        //const updatedConversation = await conversation.save();

        res.status(200).json(updatedConversation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


/*
// Update conversation (add messages)
router.patch('/', (req, res) => {
    
})*/
async function getConversations(listOfIds){
    const data = await Conversation.find({_id: {$in:listOfIds}});
    return data;
}

async function getConversationIDs(req,res, next) {
    let conversationObj;
    
    try {
        conversationObj = await UserConversation.findById(req.params.id)
        if (conversationObj == null){
            return res.status(404).json({ message: 'Cannot find conversation'})
        }
    } catch (err) {
        return res.status(500).json({ error: err.message})
    }

    res.conversation = conversationObj.conversations;
    next();
}

module.exports=router
