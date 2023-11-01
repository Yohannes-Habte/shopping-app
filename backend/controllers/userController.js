import User from '../models/userModel.js';
import createError from 'http-errors';

//====================================================================
// Get a user
//====================================================================
export const getUser = async (req, res, next) => {
  if (req.params.id === req.user.id || req.user.role === 'admin') {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        return next(createError(404, 'User does not found!'));
      }
    } catch (error) {
      next(createError(500, 'Database could not query!'));
    }
  } else {
    return next(
      createError(403, 'You are autherized only to get your own data!')
    );
  }
};

//====================================================================
// Get a user
//====================================================================
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (users) {
      res.status(200).json(users);
    } else {
      return next(createError(404, 'Users do not found!'));
    }
  } catch (error) {
    next(createError(500, 'Database could not query!'));
  }
};