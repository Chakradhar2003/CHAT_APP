const express = require('express')
const dotenv = require("dotenv")
const { chats } = require("./data/data")
const connectDB = require("./config/db")
const colors = require("colors")
const userRoutes = require("./routes/userRoutes")
const chatRoutes=require("./routes/chatRoutes")
const messageRoutes=require("./routes/messageRoutes")
dotenv.config();
connectDB();
const app = express();

var cors = require('cors');
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

app.use(cors());

app.use(express.json())
app.get('/', (req, res) => {
    res.send("API is running")
});

app.use('/api/user', userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);
// app.get('/api/chat', (req, res) => {
//     res.send(chats);
// })

// app.get('/api/chat/:id', (req, res) => {
//     //console.log(req.params.id);
//     const singleChat = chats.find(c => c._id === req.params.id)
//     res.send(singleChat)
// })

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(5000, console.log(`Server Started on PORT ${PORT}`.yellow.bold));
