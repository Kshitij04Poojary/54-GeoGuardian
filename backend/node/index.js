const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { Server } = require('socket.io'); // Import the server-side version
const http = require('http'); // Required for integrating Socket.IO with Express
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const User = require('./models/usersModel');
const Post = require('./models/post');
const Forum = require('./models/forum');
const Refugee = require('./models/refugee');
const axios = require('axios');
const path = require('path');
const Dashboard=require('./models/ngoDashboardModel')
const ngoDashboardRouter = require("./routers/ngoDashboardRouter");

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
app.use(cors({origin:"http://localhost:5173"}))
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

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
const chatbotRouter = require('./routers/chatbotRouter');
const postRouter = require('./routers/postRouter');
const ngoRouter = require('./routers/ngoDashboardRouter');
const forumRouter = require('./routers/forumRouter');
const refugeeRouter = require('./routers/refugeeRouter');

// Routes
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
app.use('/api/auth', authRouter);
app.use('/api/broadcast', broadcastRouter);
app.use("/api/chatbot", chatbotRouter);
app.use('/api/posts', postRouter);
app.use('/api/ngo', ngoRouter);
app.use('/api/forum', forumRouter);
app.use('/api/refugee', refugeeRouter);
app.use("/api/dashboard", ngoDashboardRouter);

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