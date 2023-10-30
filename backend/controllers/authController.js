import User from '../models/userModel.js';
import createError from 'http-errors';
import bcrypt from 'bcryptjs';
import generateToken from '../middleware/generateToken.js';

//=========================================================================
// Create an account
//=========================================================================
export const createAccount = async (req, res, next) => {
  const { name, email, password, image, role, agree } = req.body;
  try {
    const user = await User.findOne({ email: email });

    // If user does not exist in the data base, ....
    if (user) {
      return next(
        createError(400, 'Email has been taken! Please Try another one')
      );
    }

    // User image
    // const filename = req.file.filename;
    // const fileUrl = path.join(filename);

    // If user does not exist in the database, ....
    if (!user) {
      const newUser = new User({
        name: name,
        email: email,
        password: password,
        image: image,
        role: role,
        agree: agree,
      });

      const savedUser = await newUser.save();

      // generate user token
      const registerToken = generateToken(savedUser._id);

      return res
        .cookie('access_token', registerToken, {
          path: '/',
          httpOnly: true,
          expires: new Date(Date.now() + 60 * 60 * 1000),
          sameSite: 'none',
          secure: true,
        })
        .status(201)
        .json({
          _id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
          image: savedUser.image,
          agree: savedUser.agree,
          role: savedUser.role,
          token: registerToken,
        });
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'User could not sign up. Please try again!'));
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
      const loginToken = generateToken(user._id);

      return res
        .cookie('access_token', loginToken, {
          path: '/',
          httpOnly: true,
          expires: new Date(Date.now() + 60 * 60 * 1000),
          sameSite: 'none',
          secure: true,
        })
        .status(201)
        .json({ rest, loginToken });
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'User could not login. Please try again!'));
  }
};
