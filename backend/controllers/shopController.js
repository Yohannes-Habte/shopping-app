import createError from 'http-errors';
import Shop from '../models/shopModel.js';
import bcrypt from 'bcryptjs';
import sellerToken from '../middleware/shopToken.js';

//=========================================================================
// Create a seller
//=========================================================================
export const createShop = async (req, res, next) => {
  try {
    const { name, email, password, image, phoneNumber, shopAddress, agree } =
      req.body;
    const sellerEmail = await Shop.findOne({ email: email });

    if (sellerEmail) {
      return next(createError(400, 'Seller email already exists!'));
    }

    // New seller or new shop
    const newSeller = new Shop({
      name: name,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      image: image,
      shopAddress: shopAddress,
      agree: agree,
    });

    // Save the new seller in the database
    try {
      await newSeller.save();
    } catch (error) {
      return next(createError(500, 'New seller could not be saved'));
    }

    // Generate Seller token
    const registerShopToken = sellerToken(newSeller._id);
    // Response
    return res
      .cookie('shopToken', registerShopToken, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 120 * 60 * 1000),
        sameSite: 'none',
        secure: true,
      })
      .status(201)
      .json({ shop: newSeller, token: registerShopToken });
  } catch (error) {
    console.log(error);
    return next(
      createError(500, 'The shop could not created. Please try again!')
    );
  }
};

//=========================================================================
// Login shop
//=========================================================================
export const loginSeller = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const seller = await Shop.findOne({ email: email });

    // If user does not exist in the database, then ....
    if (!seller) {
      return next(
        createError(400, 'This email does not exist! Please sign up!')
      );
    }

    // If user exist in the database, then check password validity
    const isPasswordValid = await bcrypt.compare(password, seller.password);
    if (!isPasswordValid) {
      return next(createError(400, 'Invalid password! Please try again!'));
    }

    if (seller && isPasswordValid) {
      const { password, ...rest } = seller._doc;

      // generate login shop token
      const shopLoginToken = sellerToken(seller._id);

      return res
        .cookie('shopToken', shopLoginToken, {
          path: '/',
          httpOnly: true,
          expires: new Date(Date.now() + 60 * 60 * 1000),
          sameSite: 'none',
          secure: true,
        })
        .status(201)
        .json(rest);
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'User could not login. Please try again!'));
  }
};

//=========================================================================
// Logout shop which is a seller
//=========================================================================
export const sellerLogout = async (req, res, next) => {
  try {
    res.cookie('shopToken', null, {
      httpOnly: true,
      expires: new Date(0),
      sameSite: 'none',
      secure: true,
    });
    res.status(201).json({
      success: true,
      message: 'Log out successful!',
    });
  } catch (error) {
    next(createError(500, 'Seller could not logout. Please try again!'));
  }
};

//=========================================================================
// Update shop Profile
//=========================================================================
export const updateShopProfile = async (req, res, next) => {
  try {
    const { image, name, phoneNumber, shopAddress, description } = req.body;

    const shop = await Shop.findById(req.shop._id);

    if (!shop) {
      return next(createError(400, 'Shop not found!'));
    }
    shop.image = image;
    shop.name = name;
    shop.phoneNumber = phoneNumber;
    shop.shopAddress = shopAddress;
    shop.description = description;

    await shop.save();

    res.status(201).json(shop);
  } catch (error) {
    next(createError(500, 'Seller profile is not update. Please try again!'));
  }
};

//====================================================================
// Get a Seller/shop
//====================================================================
export const getShop = async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.shop._id);

    if (!shop) {
      return next(createError(404, 'Shop does not found! Please try again!'));
    }

    return res.status(200).json({ success: true, shop });
  } catch (error) {
    next(createError(500, 'Database could not query! Please try again!'));
    console.log(error);
  }
};

//====================================================================
// Get all sellers/shops
//====================================================================
export const getAllShops = async (req, res, next) => {
  try {
    const shops = await Shop.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      shops,
    });
  } catch (error) {
    next(createError(500, 'Database could not query!'));
  }
};

//====================================================================
// Update seller/shop withdraw methods
//====================================================================
export const updatePaymentMethods = async (req, res, next) => {
  try {
    const { withdrawMethod } = req.body;

    const shop = await Shop.findByIdAndUpdate(req.shop._id, { withdrawMethod });

    // Save changes to a shop
    shop.save();

    res.status(201).json({
      success: true,
      shop,
    });
  } catch (error) {
    console.log(error);
    next(createError(500, 'Database could not update payment method!'));
  }
};

//====================================================================
// Delete seller/shop withdraw methods
//====================================================================
export const deleteWithdrawMethod = async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.shop._id);

    if (!shop) {
      return next(createError(400, 'Shop not found! Please try again!'));
    }

    // nullify the withdrawMethod
    shop.withdrawMethod = null;

    await shop.save();

    res.status(200).json({
      success: true,
      shop,
    });
  } catch (error) {
    next(createError(500, 'Database could not delete payment method!'));
  }
};

//====================================================================
// Delete single shop by admin only
//====================================================================
export const deleteSingleShop = async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.params.id);

    if (!shop) {
      return next(createError(400, 'Shop not found! Please try again!'));
    }

    await Shop.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Shop is successfully deleted!',
    });
  } catch (error) {
    next(createError(500, 'Database could not delete shop! Please try again!'));
  }
};

//====================================================================
// Delete all shops by admin only
//====================================================================
export const deleteAllShops = async (req, res, next) => {
  try {
    await Shop.deleteMany();

    res.status(200).json({
      success: true,
      message: 'Shops have been deleted successfully!',
    });
  } catch (error) {
    next(
      createError(500, 'Database could not delete shops! Please try again!')
    );
  }
};
