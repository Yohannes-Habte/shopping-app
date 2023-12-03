import createError from 'http-errors';
import Shop from '../models/shopModel.js';
import bcrypt from 'bcryptjs';
import sellerToken from '../middleware/shopToken.js';

//=========================================================================
// Create a seller
//=========================================================================
export const createShop = async (req, res, next) => {
  try {
    const { name, email, password, image, phoneNumber, shopAddress } = req.body;
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
    const seller = await Shop.findById(req.params.id);

    if (!seller) {
      return next(createError(400, 'Seller not found!'));
    }

    res.cookie('shopToken', null, {
      httpOnly: true,
      expires: new Date(0),
      sameSite: 'none',
      secure: true,
    });
    res.status(200).json(`Seller has successfully logged out`);
  } catch (error) {
    next(createError(500, 'Seller could not logout. Please try again!'));
  }
};

//=========================================================================
// Update shop Profile
//=========================================================================

export const updateShopProfile = async (req, res, next) => {
  try {
    const { image, name, phoneNumber, shopAddress, description } =
      req.body;

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
    console.log('The shop is', shop);

    if (!shop) {
      return next(createError(404, 'Shop does not found! Please try again!'));
    }

    return res.status(200).json(shop);
  } catch (error) {
    next(createError(500, 'Database could not query! Please try again!'));
    console.log(error);
  }
};

//====================================================================
// Get all sellers/shops
//====================================================================
export const getShops = async (req, res, next) => {
  try {
    const sellers = await Shop.find();
    if (sellers) {
      res.status(200).json(sellers);
    } else {
      return next(createError(404, 'Sellers do not found!'));
    }
  } catch (error) {
    next(createError(500, 'Database could not query!'));
  }
};
