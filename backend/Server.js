require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

connectDB();


app.use('/api/auth', require('./routes/authRoutes'));    
app.use('/api/auth', require('./routes/loginRoutes'));   
app.use('/api/coupon', require('./routes/couponRoutes')); 
app.use('/api/profile', require('./routes/profileRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));