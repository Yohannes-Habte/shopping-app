import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const shopSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: {
      type: String,
      required: true,
      default: 'https://i.ibb.co/4pDNDk1/avatar.png',
    },
    phoneNumber: { type: Number, required: true },
    zipCode: { type: Number, required: true },
    role: { type: String, default: 'seller', enum: ['seller', 'admin'] },
    description: { type: String },
    withdrawMethod: { type: Object },
    availableBalance: { type: Number, default: 0 },
    transections: [
      {
        amount: { type: Number, required: true },
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
