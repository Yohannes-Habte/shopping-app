import createError from 'http-errors';
import Shop from '../models/shopModel.js';
import bcrypt from 'bcryptjs';
import { generateSellerToken } from '../middleware/auth.js';

//=========================================================================
// Create a seller
//=========================================================================
export const createShop = async (req, res, next) => {
  try {
    const { name, email, password, address, phoneNumber, image, zipCode } =
      req.body;
    const sellerEmail = await Shop.findOne({ email: email });

    if (sellerEmail) {
      return next(
        createError(
          400,
          'Seller email already exists! Please try with new email!'
        )
      );
    }

    const newSeller = new Shop({
      name: name,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      image: image,
      address: address,
      zipCode: zipCode,
    });

    // Save the new seller in the database
    const saveSeller = await newSeller.save();
    const sellerToken = generateSellerToken(saveSeller._id);
    return res
      .cookie('seller_token', sellerToken, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 60 * 1000),
        sameSite: 'none',
        secure: true,
      })
      .status(201)
      .json(saveSeller);
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

      // generate user token
      const shopLoginToken = generateSellerToken(seller._id);

      return res
        .cookie('seller_token', shopLoginToken, {
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

    res.cookie('seller_token', null, {
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

//====================================================================
// Get a Seller/shop
//====================================================================
export const getShop = async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.params.id);
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
