import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config();


const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(passport.initialize());

// Routes
app.use('/api/v1/user', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
