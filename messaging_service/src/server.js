// uses dotenv to get the environment variables
require('dotenv').config()

//imports
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');

// create express backend 
const app = express();

//connect to our database
const uri = "mongodb+srv://dbChat:group12@cluster0.gochocx.mongodb.net/Chat?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.error("Connected to MongoDB"));

// adding sockets
const httpServer = http.createServer(app);
const io = socketIO(server);
io.on('connection', (socket) =>{
  console.log('user has connected');

  // handle event for chatting
  socket.on('chat_interaction', (message) =>{
    console.log("Recieved message: ",message);
    // broadcast message to people in chatapp
    io.emit('chat_interaction',message);
  });

  // handle disconnect
  socket.on('disconnect', () =>{
    console.log('User disconnected');
  });
});

//adding middleware cors

const userConversationRouter = require('./routes/userConversations')
const authMiddleware = require("./middleware/authMiddleware");

app.use(cors({
    origin: 'http://localhost:8080'
  }));

// makes our app accept json
app.use(express.json())
app.use(authMiddleware)
// importing route so we can redirect api calls
const inboxRouter = require('./routes/inbox')
app.use('/inbox', inboxRouter)
app.use('/userConversations',userConversationRouter)

// this port is listening for any request from the front-end
app.listen(3000, () => console.log('Server has started'));
