import express from 'express';
import {
  createShop,
  deleteWithdrawMethod,
  getAllShops,
  getShop,
  loginSeller,
  sellerLogout,
  updatePaymentMethods,
  updateShopProfile,
} from '../controllers/shopController.js';
import { authAdmin, authSeller } from '../middleware/auth.js';

// shop Router
const shopRouter = express.Router();

// shop routes
shopRouter.post('/create-shop', createShop);
shopRouter.post('/login-shop', loginSeller);
shopRouter.get('/logout-shop', sellerLogout);
shopRouter.put('/update-shop-profile', authSeller, updateShopProfile);
shopRouter.put('/update-payment-methods', authSeller, updatePaymentMethods);
shopRouter.delete('/delete-payment-method', authSeller, deleteWithdrawMethod);
shopRouter.get('/shop/:id', authSeller, getShop);
shopRouter.get('/',  getAllShops);
shopRouter.delete('/delete-shop/:id', authAdmin, getAllShops);
shopRouter.delete('/delete-all-shops', authAdmin, getAllShops);

// Export shop Router
export default shopRouter;
