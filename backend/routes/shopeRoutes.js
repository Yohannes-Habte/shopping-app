import express from 'express';
import { createShop, loginSeller } from '../controllers/shopController.js';

// shop Router
const shopRouter = express.Router();

// shop routes
shopRouter.post('/create-shop', createShop);
shopRouter.post('/login-shop', loginSeller);

// Export shop Router
export default shopRouter;
