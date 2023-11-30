import express from 'express';
import {
  createProduct,
  deleteSingleProduct,
  getAllShopProducts,
  getAllShopsProducts,
  getSingleProduct,
  productReview,
  shopsProducts,
} from '../controllers/productController.js';
import { authSeller, authUser } from '../middleware/auth.js';

// product Router
const productRouter = express.Router();

// product routes
productRouter.post('/create-product', createProduct);
productRouter.put('/product/review', authUser, productReview);
productRouter.get('/', getAllShopsProducts);
productRouter.get('/:shopID/shop-products', getAllShopProducts);
productRouter.get('/:productID', getSingleProduct);
productRouter.delete('/:productID', authSeller, deleteSingleProduct);
productRouter.get('/shops/products', shopsProducts);

// Export product Router
export default productRouter;
