// uses dotenv to get the environment variables
require('dotenv').config()

//imports
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express();

//connect to our database
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.error("Connected to MongoDB"));


//adding middleware cors
app.use(cors({
    origin: 'http://localhost:8080'
  }));
  
// makes our app accept json
app.use(express.json())

// importing route so we can redirect api calls
const inboxRouter = require('./routes/inbox')
app.use('/inbox', inboxRouter)

const userConversationRouter = require('./routes/userConversations')
app.use('/userConversations',userConversationRouter)

// this port is listening for any request from the front-end
app.listen(3000, () => console.log('Server has started'));