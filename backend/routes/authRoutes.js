import express from 'express';
import {
  activateUser,
  createAccount,
  loginUser,
} from '../controllers/authController.js';
import { upload } from '../multer.js';

// Auth Router
const authRouter = express.Router();

// Auth routes
authRouter.post('/register', createAccount);
authRouter.post('/activation', activateUser);
authRouter.post('/login', loginUser);

// Export auth Router
export default authRouter;
