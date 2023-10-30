import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import cookieParser from 'cookie-parser';

// Routes
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import globalErrorHandler from './middleware/globalErrorHandler.js';


// Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static('uploads')); // image upload using multer
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://shopping-app.vercel.app'],
    credentials: true, // to send token from the backend to the frontend
  })
);

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database successfully connected!'.blue.bold);
  } catch (error) {
    console.log(error);
  }
};

app.use(morgan('tiny'));

// End points
app.use('/api/auths',  authRouter);
app.use('/api/users', userRouter);

// Global error handler
app.use(globalErrorHandler);

// Server Listner
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`The server starts on ${process.env.BACKEND_URL}`.yellow.bold);
});
