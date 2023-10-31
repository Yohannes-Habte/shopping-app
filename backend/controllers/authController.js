import User from '../models/userModel.js';
import createError from 'http-errors';
import bcrypt from 'bcryptjs';
import generateToken from '../middleware/generateToken.js';
import JWT from 'jsonwebtoken';
import sendEmail from '../utils/sendMail.js';

// Create activation token
const createActivationToken = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '5m',
  });
};

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

      // // user activation token
      // const activationToken = createActivationToken(newUser._id);
      // const activationUrl = `http://localhost:3000/activation/${activationToken}`;

      // // Email content
      // const message = `
      //   <h2> Hello ${newUser.name} </h2>
      //   <p> Please click on the link below to activate your account. </p>
      //   <p> This activation link is valid only for five minutes. </p>
      //   <a href=${activationUrl} clicktracking=off> ${activationUrl} </a>
      //   <p> Best regards, </p>
      //   <p> Lisa Consult Restaurant Team </p>
      //   `;

      // const subject = 'Activate your account';
      // const send_to = newUser.email;

      // try {
      //   await sendEmail({
      //     email: send_to,
      //     subject: subject,
      //     message: message,
      //   });
      //   res.status(201).json({
      //     success: true,
      //     message: `please check your email:- ${newUser.email} to activate your account!`,
      //   });
      // } catch (error) {
      //   return next(createError(500, 'Email has not been sent to the user!'));
      // }

      const saveNewUser = await newUser.save();
      // generate user token
      const registerToken = generateToken(saveNewUser._id);

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
// Activate User to create an acccount
//=========================================================================

export const activateUser = async (req, res, next) => {
  const { activation_token } = req.body;
  try {
    const newUser = JWT.verify(activation_token, process.env.JWT_SECRET);
    if (!newUser) {
      return next(createError(400, 'Invalid token'));
    }

    const { name, email, password, image } = newUser;

    let user = await User.findOne({ email });

    if (user) {
      return next(createError(400, 'User already exists'));
    }

    if (!user) {
      const signupUser = await User.create({
        name,
        email,
        image,
        password,
      });

      await signupUser.save();
      // generate user token
      const registerToken = generateToken(signupUser._id);

      return res
        .cookie('access_token', registerToken, {
          path: '/',
          httpOnly: true,
          expires: new Date(Date.now() + 60 * 60 * 1000),
          sameSite: 'none',
          secure: true,
        })
        .status(201)
        .json(signupUser);
    }
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
