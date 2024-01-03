import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const shopSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    description: { type: String, required: true },
    shopAddress: { type: String, required: true },
    withdrawMethod: { type: Object },
    availableBalance: { type: Number, default: 0 },
    role: { type: String, default: 'seller', enum: ['seller', 'admin'] },
    image: {
      type: String,
      required: true,
      default: 'https://i.ibb.co/4pDNDk1/avatar.png',
    },
    agree: { type: Boolean, default: false, required: true },
    transections: [
      {
        amount: { type: Number, required: [true, 'Please enter amount'] },
        status: { type: String, default: 'Processing' },
        createdAt: { type: Date, default: Date.now() },
        updatedAt: { type: Date },
      },
    ],
    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  { timestamps: true }
);

// Pre save
shopSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(err);
  }
});

const Shop = mongoose.model('Shop', shopSchema);
export default Shop;
