import createError from 'http-errors';
import JWT from 'jsonwebtoken';
import User from '../models/userModel.js';
import Shop from '../models/shopModel.js';

//====================================================================
// Generate seller token
//====================================================================
export const generateSellerToken = (id) => {
  const token = JWT.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

//====================================================================
// Is user auth
//====================================================================
export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    // If there is not token, then...
    if (!token) {
      return next(createError(401, 'User is not authenticated. Please login!'));
    }

    // If token exist, decode it
    const decodedToken = JWT.verify(token, process.env.JWT_SECRET);

    // Find user using the decoded token
    const user = await User.findById(decodedToken.id);

    console.log("The user is", user)

    // If user does not exist, it is unauthorized
    if (!user) {
      return next(createError(403, 'User is not authorized.'));
    }
    // If user exist, proceed to the next middleware
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return next(createError(500, 'User could not access such data.'));
  }
};

//====================================================================
// Is Seller auth
//====================================================================
export const authSeller = async (req, res, next) => {
  try {
    const sellerToken = req.cookies.seller_token;

    if (!sellerToken) {
      return next(
        createError(401, 'Seller is not authenticated. Please login!')
      );
    }

    const decodedToken = JWT.verify(sellerToken, process.env.JWT_SECRET);

    const seller = await Shop.findById(decodedToken.id);

    if (!seller) {
      return next(createError(403, 'You are is not authorized.'));
    }

    req.seller = seller;
    next();
  } catch (error) {
    console.log(error);
    return next(createError(500, 'User could not access such data.'));
  }
};

//====================================================================
// Is admin auth
//====================================================================
export const authAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return next(createError(401, 'User is not authenticated. Please login!'));
    }

    const decodedToken = JWT.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);
    if (user.role === 'admin') {
      req.user = user;
      next();
    } else {
      return next(createError(403, 'User is not authorized.'));
    }
  } catch (error) {
    console.log(error);
    return next(createError(500, 'User could not access such data.'));
  }
};
