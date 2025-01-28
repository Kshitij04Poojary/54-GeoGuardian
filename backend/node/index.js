const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { Server } = require('socket.io'); // Import the server-side version
const http = require('http'); // Required for integrating Socket.IO with Express
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const chatbotRouter = require("./routers/chatbotRouter");
const User = require('./models/usersModel');

require('dotenv').config();

// Create an Express app and HTTP server
const app = express();
const server = http.createServer(app); // Wrap Express with HTTP server

// Initialize Socket.IO on the HTTP server
const io = new Server(server, {
    cors: {
        origin: '*', // Allow connections from any origin (customize as needed)
        methods: ['GET', 'POST']
    }
});

const activeUsers = new Map();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // User login to associate their socket ID
    socket.on('login', (userId) => {
        activeUsers.set(userId, socket.id);
        console.log(`${userId} is now online.`);
    });

    // Send a message based on user selection
    socket.on('sendMessage', async ({ sender, receiver, message }) => {
        // Save message to the database
        const newMessage = new Message({ sender, receiver, message });
        await newMessage.save();

        // Emit message to the receiver if they're online
        const receiverSocketId = activeUsers.get(receiver);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('receiveMessage', newMessage);
        } else {
            console.log(`User ${receiver} is offline. Message saved to database.`);
        }
    });

    // Remove user from activeUsers on disconnect
    socket.on('disconnect', () => {
        for (let [userId, socketId] of activeUsers.entries()) {
            if (socketId === socket.id) {
                activeUsers.delete(userId);
                console.log(`User ${userId} disconnected.`);
                break;
            }
        }
    });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database connected");
    })
    .catch(err => {
        console.log(err);
    });

// Importing routers
const authRouter = require('./routers/authRouter');
const broadcastRouter = require('./routers/broadcastRouter');

// Routes
app.use('/api/auth', authRouter);
app.use('/api/broadcast', broadcastRouter); // Added broadcast route
app.use("/api/chatbot", chatbotRouter);

// // Test route
// app.get('/', (req, res) => {
//     res.json({ message: "Hello from the server" });
// });

app.get('/search-users', async (req, res) => {
    try {
        const { email, phone } = req.body;

        if (!email && !phone) {
            return res.status(400).json({ error: 'Either email or phone must be provided for the search.' });
        }

        // Search by email or phone
        const searchCriteria = email ? { email } : { phone };
        const users = await User.find(searchCriteria).select('email phone');

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Start the server
server.listen(process.env.PORT, () => {
    console.log('Server is listening on port', process.env.PORT);
});