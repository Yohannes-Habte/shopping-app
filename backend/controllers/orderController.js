import createError from 'http-errors';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import Shop from '../models/shopModel.js';

//=========================================================================
// Create an order
//=========================================================================

export const createOrder = async (req, res, next) => {
  try {
    const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;
    // group cart items by shopId
    const shopItemsMap = new Map();

    // Use a for loop to assign each item to the shop it belongs to
    for (const item of cart) {
      const shopId = item.shopId;
      if (!shopItemsMap.has(shopId)) {
        shopItemsMap.set(shopId, []);
      }
      // Push item to the shop it blongs to
      shopItemsMap.get(shopId).push(item);
    }

    // Create an order for each shop
    const orders = [];

    // the items belongs to the items in  shopItemsMap.get(shopId).push(item)
    for (const [shopId, items] of shopItemsMap) {
      const order = await Order.create({
        cart: items,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
      });
      orders.push(order);
    }

    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(createError(500, 'Order is not created! Please try again!'));
  }
};

//=========================================================================
// Update order status for a seller
//=========================================================================

export const updateSellerOrders = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(createError(400, 'Order not found!'));
    }

    if (req.body.status === 'Transferred to delivery partner') {
      order.cart.forEach(async (o) => {
        await updateOrder(o._id, o.qty);
      });
    }

    order.status = req.body.status;

    if (req.body.status === 'Delivered') {
      order.deliveredAt = Date.now();
      order.paymentInfo.status = 'Succeeded';
      const serviceCharge = order.totalPrice * 0.1;
      await updateSellerInfo(order.totalPrice - serviceCharge);
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      order,
    });

    async function updateOrder(id, qty) {
      const product = await Product.findById(id);

      product.stock -= qty;
      product.sold_out += qty;

      await product.save({ validateBeforeSave: false });
    }

    async function updateSellerInfo(amount) {
      const seller = await Shop.findById(req.seller.id);

      seller.availableBalance = amount;

      await seller.save();
    }
  } catch (error) {
    next(createError(500, 'Order is not updated! Please try again!'));
  }
};

//=========================================================================
// Order Refund for a user
//=========================================================================

export const orderUserRefund = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(createError(400, 'Order not found!'));
    }

    order.status = req.body.status;

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      order,
      message: 'Order Refund Request successfully!',
    });
  } catch (error) {
    next(createError(500, 'Database could not refund! Please try again!'));
  }
};

//=========================================================================
// Accept the refund by the seller
//=========================================================================

export const orderSellerRefund = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler('Order not found with this id', 400));
    }

    order.status = req.body.status;

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order Refund successfull!',
    });

    if (req.body.status === 'Refund Success') {
      order.cart.forEach(async (o) => {
        await updateOrder(o._id, o.qty);
      });
    }

    async function updateOrder(id, qty) {
      const product = await Product.findById(id);

      product.stock += qty;
      product.sold_out -= qty;

      await product.save({ validateBeforeSave: false });
    }
  } catch (error) {
    next(createError(500, 'Database could not refund! Please try again!'));
  }
};

//=========================================================================
// Get an order
//=========================================================================

export const getOrder = async (req, res, next) => {
  try {
    res.send('New order');
  } catch (error) {
    next(createError(500, 'Order could not be accessed! Please try again!'));
  }
};

//=========================================================================
// Get all orders for a user
//=========================================================================

export const getAllUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ 'user._id': req.params.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(createError(500, 'Orders could not be accessed! Please try again!'));
  }
};

//=========================================================================
// Get all orders for a seller
//=========================================================================

export const getAllSellerOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      'cart.shopId': req.params.shopId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(createError(500, 'Orders could not be accessed! Please try again!'));
  }
};

//=========================================================================
// Delete an order
//=========================================================================

export const deleteOrder = async (req, res, next) => {
  try {
    res.send('New order');
  } catch (error) {
    next(createError(500, 'Order could not be deleted! Please try again!'));
  }
};

//=========================================================================
// Delete all orders
//=========================================================================

export const deleteOrders = async (req, res, next) => {
  try {
    res.send('New order');
  } catch (error) {
    next(createError(500, 'Orders could not be deleted! Please try again!'));
  }
};

//=========================================================================
// Get all orders for all customers
//=========================================================================

export const allCustomersOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({
      deliveredAt: -1,
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(createError(500, 'Orders could not be accessed! Please try again!'));
  }
};
