const express = require('express');
const app = express();
const http = require('http');
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
const messageRoute = require('./routes/message');
const errorMiddleware = require('./middleware/errorMiddleware');
const middlewareController = require('./controllers/middlewareController');
const messageSocket = require('./socket/messageSocket');

const server = http.createServer(app);

dotenv.config();

connectDB();

const corsOptions = {
    origin: 'http://localhost:3000', // Thay thế bằng domain của client
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));

// Xử lý các yêu cầu OPTIONS
app.options('*', cors());

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

// ROUTES
app.use('/v1/auth', authRoute);
app.use('/home', middlewareController.verifyToken, homeRoute);
app.use('/news', newsRoute);
app.use('/events', eventRoute);
app.use('/api/user', middlewareController.verifyToken, userRoute);
app.use('/message', messageRoute);

// Socket.IO configuration
messageSocket(server, corsOptions);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
