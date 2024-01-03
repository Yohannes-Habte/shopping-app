import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    addresses: [
      {
        country: {
          type: String,
          required: [true, 'Please enter country'],
          minLength: [4, 'Country name should be at least 4 characters'],
          maxlength: [56, 'Country name should be at most 56 characters'],
        },
        state: {
          type: String,
          required: [true, 'Please enter state'],
          minLength: [4, 'State name should be at least 4 characters'],
          maxlength: [30, 'State name should be at most 30 characters'],
        },
        city: {
          type: String,
          required: [true, 'Please enter city'],
          minLength: [2, 'City name should be at least 2 characters'],
          maxlength: [28, 'City name should be at most 28 characters'],
        },
        address: {
          type: String,
          required: [true, 'Please enter address'],
          minLength: [2, 'City name should be at least 2 characters'],
          maxlength: [35, 'City name should be at most 35 characters'],
        },
        zipCode: {
          type: Number,
          required: [true, 'Please enter zip code'],
          minLength: [5, 'Zip code should be at least 5 characters'],
          maxlength: [10, 'Zip code should be at most 10 characters'],
        },
        addressType: {
          type: String,
          required: [true, 'Please enter address type'],
          minLength: [4, 'Address type should be at least 4 characters'],
          maxlength: [8, 'Address type should be at most 8 characters'],
        },
      },
    ],
    image: {
      type: String,
      default: 'https://i.ibb.co/4pDNDk1/avatar.png',
      required: true,
    },
    role: { type: String, default: 'customer', enum: ['customer', 'admin'] },
    agree: { type: Boolean, default: false, required: true },
    comments: [],
    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  { timestamps: true }
);

// Pre save
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(err);
  }
});

// User Model
const User = mongoose.model('User', userSchema);
export default User;
