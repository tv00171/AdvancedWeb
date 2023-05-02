const express = require('express')
const router = express.Router()
const Conversation = require('../models/inbox')

// Getting all conversations
router.get('/', async (req, res) =>{
    try {
        const conversations = await Conversation.find();
        res.json(conversations)
    } catch (err){
        res.status(500).json({error: err.message })
    }
})

//api call for retriving conversation with id 
router.get('/conversations/:id', (req, res) => {
    var conversationId = req.params.id;
    Conversations.findOne({ conversationID: conversationId }, 'messages', (err, conversation) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        console.log(conversation);
        res.send(conversation.messages);
      }
    });
  });

// Getting one conversation
router.get('/:id', getConversation,(req, res) =>{
    res.send(res.conversation)
})

// Creating a conversation ( via Contact seller from Listing microservice)
router.post('/', async (req, res) => {
    const conversation = new Conversation({
        conversationID : req.body.conversationID,
        itemName : req.body.itemName,
        itemSrc : req.body.itemSrc,
        messages: req.body.messages
    })
    try{
        const newConversation = await conversation.save();
        res.status(201).json(newConversation);
    }catch(err){
        res.status(400).json({error: err.message})
    }
})  


// Update conversation (add messages)
router.patch('/', (req, res) => {
    
})

async function getConversation(req,res, next) {
    let conversation
    try {
        conversation = await Conversation.findById(req.params.id)
        if (conversation == null){
            return res.status(404).json({ message: 'Cannot find conversation'})
        }
    } catch (err) {
        return res.status(500).json({ error: err.message})
    }

    res.conversation = conversation
    next()
}

module.exports=router