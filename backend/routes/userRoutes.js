import express from 'express';
import {
  deleteUserAddress,
  getUser,
  getUsers,
  updateUserAddress,
} from '../controllers/userController.js';
import { authAdmin, authUser } from '../middleware/auth.js';

// Auth Router
const userRouter = express.Router();

// Auth routes
userRouter.get('/user/:id', authUser, getUser);
userRouter.get('/', authAdmin, getUsers);
userRouter.put('/update-user-address', authUser, updateUserAddress);
userRouter.delete('/delete-user-address/:id', authUser, deleteUserAddress);

// Export auth Router
export default userRouter;
