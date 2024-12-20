require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { logMiddleware, errorHandler } = require('./middleware/logger');
const connectDB = require('./config/db');
const reservationRoutes = require('./routes/reservationRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(logMiddleware);

// Routes
app.use('/api/reservations', reservationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

// Error Handler Middleware
app.use(errorHandler);

// MongoDB Bağlantısı
connectDB();

app.listen(port, () => {
    console.log(`Sunucu ${port} numaralı portta çalışıyor.`);
});
