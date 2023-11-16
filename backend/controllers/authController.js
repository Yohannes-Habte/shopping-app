import User from '../models/userModel.js';
import createError from 'http-errors';
import bcrypt from 'bcryptjs';
import { userToken } from '../middleware/generateToken.js';

//=========================================================================
// Create an account
//=========================================================================
export const createAccount = async (req, res, next) => {
  const { name, email, password, phone, image, role, agree } = req.body;
  try {
    const user = await User.findOne({ email: email });

    // If user does not exist in the data base, ....
    if (user) {
      return next(
        createError(400, 'Email has been taken! Please Try another one')
      );
    }

    // If user does not exist in the database, ....
    if (!user) {
      const newUser = new User({
        name: name,
        email: email,
        password: password,
        phone: phone,
        image: image,
        role: role,
        agree: agree,
      });

      const saveNewUser = await newUser.save();
      // generate user token
      const registerToken = userToken(saveNewUser._id);

      return res
        .cookie('access_token', registerToken, {
          path: '/',
          httpOnly: true,
          expires: new Date(Date.now() + 60 * 60 * 1000),
          sameSite: 'none',
          secure: true,
        })
        .status(201)
        .json(saveNewUser);
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'User could not sign up. Please try again!'));
  }
};

//=========================================================================
// Activate user profile
//=========================================================================

export const updateUserProfile = async (req, res, next) => {
  try {
    const { name, email, password, phone, image } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(createError(400, 'User not found'));
    }

    // If user exist in the database, check password validity
    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(createError(400, 'Invalid password'));
    }

    const updated = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          name: name,
          email: email,
          phone: phone,
          image: image,
        },
      },
      { new: true, runValidators: true }
    );

    // save updated user in the database
    const updatedUser = await updated.save();

    // generate user token
    const updatedUserToken = userToken(updatedUser._id);

    return res
      .cookie('access_token', updatedUserToken, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 60 * 1000),
        sameSite: 'none',
        secure: true,
      })
      .status(201)
      .json(updatedUser);
  } catch (error) {
    console.log(error);
    next(
      createError(500, 'User account could not be activated! Please try again!')
    );
  }
};

//=========================================================================
// Login user
//=========================================================================

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    // If user does not exist in the database, then ....
    if (!user) {
      return next(
        createError(400, 'This email does not exist! Please sign up!')
      );
    }

    // If user exist in the database, then check password validity
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createError(400, 'Invalid password! Please sign up!'));
    }

    if (user && isPasswordValid) {
      const { password, ...rest } = user._doc;

      // generate user token
      const loginToken = userToken(user._id);

      return res
        .cookie('access_token', loginToken, {
          path: '/',
          httpOnly: true,
          expires: new Date(Date.now() + 60 * 60 * 1000),
          sameSite: 'none',
          secure: true,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'User could not login. Please try again!'));
  }
};

//=========================================================================
// Logout user
//=========================================================================

export const userLogout = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      next(createError(400, 'User not found!'));
    }

    // First Option to log out a user
    res.clearCookie('access_token');
    res.status(200).json(`You have successfully logged out`);

    // Second option to log out a user:
    /** 
    res.cookie('access_token', null, {
      httpOnly: true,
      expires: new Date(0), // cookie is expired
      sameSite: 'none',
      secure: true,
    });
   res.status(200).json(`${user.name} has successfully logged out`);
    */
  } catch (error) {
    next(createError(500, 'User could not logout. Please try again!'));
  }
};

//=========================================================================
// Login user
//=========================================================================

export const deleteAccount = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.account);

    if (user) {
      await User.findByIdAndDelete(req.params.account);

      res.clearCookie('access_token');
      res.status(200).json(`User has been successfully deleted!`);
    } else {
      return next(createError(404, 'User not found!'));
    }
  } catch (error) {
    return next(
      createError(500, 'User could not delete account. Please try again!')
    );
  }
};
