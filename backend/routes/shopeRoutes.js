import express from 'express';
import {
  createShop,
  getShop,
  getShops,
  loginSeller,
  sellerLogout,
} from '../controllers/shopController.js';
import { authSeller } from '../middleware/auth.js';

// shop Router
const shopRouter = express.Router();

// shop routes
shopRouter.post('/create-shop', createShop);
shopRouter.post('/login-shop', loginSeller);
shopRouter.get('/logout-shop/:id', sellerLogout);
shopRouter.get('/:id', getShop);
shopRouter.get('/', getShops);

// Export shop Router
export default shopRouter;
