import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: 'https://i.ibb.co/4pDNDk1/avatar.png' },
    role: { type: String, default: 'customer', enum: ['customer', 'admin'] },
    agree: { type: Boolean, default: false},
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
