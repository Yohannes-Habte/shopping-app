import generateToken from '../middleware/generateToken.js';
import createError from 'http-errors';
import Shop from '../models/shopModel.js';
import bcrypt from 'bcryptjs';

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
    const sellerToken = generateToken(saveSeller._id);
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
      const shopLoginToken = generateToken(seller._id);

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

//====================================================================
// Get a Seller
//====================================================================
export const getSeller = async (req, res, next) => {
  if (req.params.id === req.seller.id) {
    try {
      const seller = await Shop.findById(req.params.id);
      if (seller) {
        res.status(200).json(seller);
      } else {
        return next(
          createError(404, 'Seller does not found! Please try again!')
        );
      }
    } catch (error) {
      next(createError(500, 'Database could not query!'));
      console.log(error);
    }
  } else {
    return next(
      createError(403, 'You are autherized only to get your own data!')
    );
  }
};

//====================================================================
// Get all sellers
//====================================================================
export const getSellers = async (req, res, next) => {
  
  if ( req.seller.role !== "admin") {
    return next(createError(403, 'Unauthorized user!'));
  }

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
