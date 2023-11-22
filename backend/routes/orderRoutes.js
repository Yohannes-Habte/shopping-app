import express from 'express';
import {
  allCustomersOrders,
  createOrder,
  deleteOrder,
  deleteOrders,
  getAllSellerOrders,
  getAllUserOrders,
  getOrder,
  orderSellerRefund,
  orderUserRefund,
  updateSellerOrders,
} from '../controllers/orderController.js';

// order Router
const orderRouter = express.Router();

// order routes
orderRouter.post('/new-order', createOrder);
orderRouter.put('/update-order-status/:id', updateSellerOrders);
orderRouter.put('/order-refund/:id', orderUserRefund);
orderRouter.put('/order-refund-success/:id', orderSellerRefund);
orderRouter.get('/order/:id', getOrder);
orderRouter.get('/user/:userId', getAllUserOrders);
orderRouter.get('/seller/:shopId', getAllSellerOrders);
orderRouter.get('/', allCustomersOrders);
orderRouter.delete('/order/id', deleteOrder);
orderRouter.delete('/', deleteOrders);

// Export order Router
export default orderRouter;
