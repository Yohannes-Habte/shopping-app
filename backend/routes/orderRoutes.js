import express from 'express';
import {
  allCustomersOrders,
  allShopOrders,
  createOrder,
  deleteOrder,
  deleteOrders,
  getAllUserOrders,
  getOrder,
  orderShopRefund,
  orderUserRefund,
  updateShopOrders,
} from '../controllers/orderController.js';
import { authSeller } from '../middleware/auth.js';

// order Router
const orderRouter = express.Router();

// order routes
orderRouter.post('/new-order', createOrder);
orderRouter.put('/update-order-status/:id', authSeller, updateShopOrders);
orderRouter.put('/order-refund/:id', orderUserRefund);
orderRouter.put('/order-refund-success/:id', authSeller, orderShopRefund);
orderRouter.get('/order/:id', getOrder);
orderRouter.get('/user/:userId', getAllUserOrders);
orderRouter.get('/shop/:shopId', allShopOrders);
orderRouter.get('/', allCustomersOrders);
orderRouter.delete('/order/id', deleteOrder);
orderRouter.delete('/', deleteOrders);

// Export order Router
export default orderRouter;
