const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const chatbotRouter = require("./routers/chatbotRouter");

const app = express();
require('dotenv').config();

// Middleware
app.use(cors());
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

// Routes
app.use('/api/auth', authRouter);
app.use('/api/broadcast', broadcastRouter); // Added broadcast route
app.use("/api/chatbot", chatbotRouter);

// Test route
app.get('/', (req, res) => {
    res.json({ message: "Hello from the server" });
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log('Server is listening on port', process.env.PORT);
});
