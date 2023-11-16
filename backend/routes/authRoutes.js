import express from 'express';
import {
  createAccount,
  deleteAccount,
  loginUser,
  updateUserProfile,
  userLogout,
} from '../controllers/authController.js';
import { authUser } from '../middleware/auth.js';

// Auth Router
const authRouter = express.Router();

// Auth routes
authRouter.post('/register', createAccount);
authRouter.put('/update-user-profile', updateUserProfile);
authRouter.post('/login', loginUser);
authRouter.get('/logout/:id', userLogout);
authRouter.delete('/delete-account/:account', authUser, deleteAccount);

// Export auth Router
export default authRouter;
