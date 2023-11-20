import express from 'express';
import {
  createCouponCode,
  deleteCouponCode,
  getAllCouponCodes,
  getCouponCodePercent,
} from '../controllers/couponController.js';

// coupon Router
const couponRouter = express.Router();

// coupon routes
couponRouter.post('/create-coupon', createCouponCode);
couponRouter.get('/shop/:shopID', getAllCouponCodes);
couponRouter.get('/shop/value/:name', getCouponCodePercent);
couponRouter.delete('/:couponID', deleteCouponCode);

// Export coupon Router
export default couponRouter;
