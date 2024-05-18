const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');
const authRoute = require('./routes/auth');
const homeRoute = require('./routes/home');
const errorMiddleware = require('./middleware/errorMiddleware');

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// ROUTES
app.use('/v1/auth', authRoute);
app.use('/', homeRoute);

app.use(errorMiddleware);
app.listen(3001, () => {
    console.log('Server is running');
});
