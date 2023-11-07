import express from 'express';
import {
  createShop,
  getSeller,
  getSellers,
  loginSeller,
} from '../controllers/shopController.js';
import { authSeller } from '../middleware/auth.js';

// shop Router
const shopRouter = express.Router();

// shop routes
shopRouter.post('/create-shop', createShop);
shopRouter.post('/login-shop', loginSeller);
shopRouter.get('/:id', authSeller, getSeller);
shopRouter.get('/', authSeller, getSellers);

// Export shop Router
export default shopRouter;
