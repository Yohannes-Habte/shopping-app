import mongoose from 'mongoose';

const { Schema } = mongoose;

const couponSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    value: { type: Number, required: true },
    minAmount: { type: Number },
    maxAmount: { type: Number },
    shopId: { type: String, required: true },
    selectedProduct: { type: String },
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

// Coupon Model
const Coupon = mongoose.model('Coupon', couponSchema);
export default Coupon;
