import createError from 'http-errors';
import JWT from 'jsonwebtoken';
import User from '../models/userModel.js';

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

    console.log('The logged in user is', user);

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
