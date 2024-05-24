const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoute = require('./routes/auth');
const homeRoute = require('./routes/home');
const errorMiddleware = require('./middleware/errorMiddleware');
const middlewareController = require('./controllers/middlewareController');

dotenv.config();
const app = express();
connectDB();

app.use(
    cors({
        origin: 'http://localhost:3000', // Thay thế bằng domain của client
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());

// ROUTES
app.use('/v1/auth', authRoute);
app.use('/home', middlewareController.verifyToken, homeRoute);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
