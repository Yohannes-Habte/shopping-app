import express from 'express';
import {
  createProduct,
  deleteSingleProduct,
  getAllShopProducts,
  getAllShopsProducts,
  getSingleProduct,
} from '../controllers/productController.js';

// product Router
const productRouter = express.Router();

// product routes
productRouter.post('/create-product', createProduct);
productRouter.get('/', getAllShopsProducts);
productRouter.get('/:shopID/shop-products', getAllShopProducts);
productRouter.get('/:productID', getSingleProduct);
productRouter.delete('/:productID', deleteSingleProduct);

// Export product Router
export default productRouter;
