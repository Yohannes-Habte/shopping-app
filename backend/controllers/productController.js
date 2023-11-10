import Product from '../models/productModel.js';
import createError from 'http-errors';
import Shop from '../models/shopModel.js';

//==============================================================================
// Create Product
//==============================================================================
export const createProduct = async (req, res, next) => {
  try {
    // Find shop ID
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);

    if (!shop) {
      return createError(401, 'Shop not found! Please login!');
    } else {
      const product = new Product({
        ...req.body,
        shop: shop,
      });
      const saveProduct = await product.save();

      res.status(201).json(saveProduct);
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'Product could not be created! Please try again!'));
  }
};

//==============================================================================
// Get Single Product
//==============================================================================
export const getSingleProduct = async (req, res, next) => {
 
  try {
    // Get the ids for the shop and the product
    const shopID = req.params.shopID;
    const productID = req.params.productID;

    // find the shop id (seller id) and then find the product id
    const shop = await Shop.findById(shopID);
    if (!shop) {
      return next(createError(400, 'Shop not found!'));
    }

    // product id
    const product = await Product.findById(productID);
    if (!product) {
      return next(createError(400, `Product not found in ${shop.name} shop !`));
    }

    // If shop and product exist, then you can get the product for that particular shop
    if (shop && product) {
      return res.status(200).json(product);
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'Product could not be accessed! Please try again!'));
  }
};

//==============================================================================
// Get All Products
//==============================================================================
export const getAllShopProducts = async (req, res, next) => {
 
  try {
    // Get the shop by its id
    const shopID = req.params.shopID;

    // find the shop id (seller id) and then find all its products
    const shop = await Shop.findById(shopID);

    if (!shop) {
      return next(createError(400, 'Shop not found!'));
    }

    // If the shop found, find all its products using the shopId in the database
    const products = await Product.find({ shopId: shopID });
    if (!products) {
      return next(createError(400, 'Products not found!'));
    }

    // if shop and products exist, get the products for that particular shop
    if (shop && products) {
      return res.status(200).json(products);
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'Products could not query! Please try again!'));
  }
};

//==============================================================================
// Get All Products
//==============================================================================
export const getAllShopsProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (!products) {
      return next(createError(400, 'Products not found!'));
    } else {
      return res.status(200).json(products);
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'Products could not query! Please try again!'));
  }
};

//==============================================================================
// Delete Single Products
//==============================================================================
export const deleteSingleProduct = async (req, res, next) => {
  try {
    // the ids of the shop and product
    const shopID = req.params.shopID;
    const productID = req.params.productID;

    // find the shop id (seller id) and then find the product id
    const shop = await Shop.findById(shopID);
    if (!shop) {
      return next(createError(400, 'Shop not found!'));
    }

    // product id
    const product = await Product.findById(productID);
    if (!product) {
      return next(
        createError(400, `Product not found  in ${shop.name} shop !`)
      );
    }

    // If shop and product exist, then you can get the product for that particular shop
    if (shop && product) {
      await Product.findByIdAndDelete(productID);
      return res
        .status(200)
        .json(
          `The ${product.name} form ${shop.name} has been successfully deleted!`
        );
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'Product could not be deleted! Please try again!'));
  }
};
