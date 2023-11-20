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

//====================================================================
// Update user address
//====================================================================

export const updateUserAddress = async (req, res, next) => {
  try {
    // Identify the user by id
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(createError(404, 'User not found'));
    }

    // Is the same address type
    const sameAddressType = user.addresses.find(
      (address) => address.addressType === req.body.addressType
    );
    if (sameAddressType) {
      return next(
        createError(400, `${req.body.addressType} address already exist!`)
      );
    }

    // Is address exist
    const existAddress = user.addresses.find(
      (address) => address._id === req.body._id
    );

    // If address exist, update the exist address. Otherwise, you need to add new address
    if (existAddress) {
      Object.assign(existAddress, req.body);
    } else {
      // Add new Address to the array
      user.addresses.push(req.body);
    }

    // After updating the address, save the user in the database
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(
      createError(500, 'The address could not be updated! Please try again!')
    );
  }
};


//====================================================================
// Delete user address
//====================================================================

export const deleteUserAddress = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return next(createError(404, 'User not found'));
    }
    // instead of findByIdAndUpdate, you can use updateOne
    await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      { $pull: { addresses: { _id: addressId } } }
    );

    // Update user data (address)
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(
      createError(500, 'The address could not be deleted! Please try again!')
    );
  }
};
