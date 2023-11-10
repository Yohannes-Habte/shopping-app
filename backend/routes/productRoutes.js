import express from 'express';
import {
  createProduct,
  deleteSingleProduct,
  getAllShopProducts,
  getAllShopsProducts,
  getSingleProduct,
} from '../controllers/productController.js';
import { authSeller } from '../middleware/auth.js';

// product Router
const productRouter = express.Router();

// product routes
productRouter.post('/create-product', createProduct);
productRouter.get('/', getAllShopsProducts);
productRouter.get('/:shopID/products', getAllShopProducts);
productRouter.get('/:shopID/:productID', getSingleProduct);
productRouter.delete('/:shopID/:productID', deleteSingleProduct);

// Export product Router
export default productRouter;
