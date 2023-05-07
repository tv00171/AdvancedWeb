const express = require('express')
const router = express.Router()
const UserConversation = require('../models/userConversations')
const Conversation = require('../models/inbox')

// Getting one conversation
router.get('/', async (req, res) =>{
    try {
        console.log("Locals")

        console.log(res.locals.user.id)
        var conversationObj = await UserConversation.findById(res.locals.user.id)
        console.log(conversationObj)
        if (conversationObj == null){
            return res.status(404).json({ message: 'Cannot find conversation'})
        }
    } catch (err) {
        return res.status(500).json({ error: err.message})
    }

    conversationObj  =conversationObj.conversations;
    try{
        const listOfIds =conversationObj;
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

/*
// Creating a conversation ( via Contact seller from Listing microservice)
router.post('/', async (req, res) => {
    const conversation = new Conversation({
        conversationID : req.body.conversationID,
        itemName : req.body.itemName,
        itemSrc : req.body.itemSrc,
        messages: []
    })
    try{
        const newConversation = await conversation.save();
        res.status(201).json(newConversation);
    }catch(err){
        res.status(400).json({error: err.message})
    }
})  */

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
    let conversationHeaderObj;
    let listOfConversationHeaderProps = [];

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
