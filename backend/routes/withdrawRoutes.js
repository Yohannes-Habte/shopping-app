import express from 'express';
import {
  createWithdrawMoney,
  deleteAllMoneyWithdraws,
  deleteMoneyWithdrawRequest,
  getAllWithdrawRequests,
  updateMoneyWithdrawRequest,
} from '../controllers/withdrawController.js';
import { authAdmin, authSeller } from '../middleware/auth.js';

// withdraw Router
const withdrawRouter = express.Router();

// withdraw routes
withdrawRouter.post('/create-withdraw-request', authSeller, createWithdrawMoney);
withdrawRouter.put('/update-withdraw-request/:id', authAdmin, updateMoneyWithdrawRequest);
withdrawRouter.get('/', authAdmin, getAllWithdrawRequests);
withdrawRouter.delete('/:id', authAdmin, deleteMoneyWithdrawRequest);
withdrawRouter.delete('/', authAdmin, deleteAllMoneyWithdraws);

// Export withdraw Router
export default withdrawRouter;
