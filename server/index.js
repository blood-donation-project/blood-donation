const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoute = require('./routes/auth');
const homeRoute = require('./routes/home');
const newsRoute = require('./routes/news');
const eventRoute = require('./routes/event');
const userRoute = require('./routes/user');
const friendRoute = require('./routes/friend');
const searchRoute = require('./routes/search');
const postRoute = require('./routes/post');
const errorMiddleware = require('./middleware/errorMiddleware');
const middlewareController = require('./controllers/middlewareController');

dotenv.config();
const app = express();
connectDB();

app.use(
    cors({
        origin: 'http://localhost:3000', // Thay thế bằng domain của client
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    }),
);
app.options('*', cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
// ROUTES
app.use('/v1/auth', authRoute);
app.use('/home', middlewareController.verifyToken, homeRoute);
app.use('/news', newsRoute);
app.use('/events', eventRoute);
app.use('/api/user', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/friends', friendRoute);
app.use('/api/search', searchRoute);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});