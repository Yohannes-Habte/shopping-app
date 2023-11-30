import express from 'express';
import {
  createCouponCode,
  deleteCouponCode,
  getAllCouponCodes,
  getCouponCodePercent,
} from '../controllers/couponController.js';
import { authSeller } from '../middleware/auth.js';

// coupon Router
const couponRouter = express.Router();

// coupon routes
couponRouter.post('/create-coupon', authSeller, createCouponCode);
couponRouter.get('/shop/:shopID', authSeller, getAllCouponCodes);
couponRouter.get('/shop/value/:name', getCouponCodePercent);
couponRouter.delete('/:couponID', authSeller, deleteCouponCode);

// Export coupon Router
export default couponRouter;
