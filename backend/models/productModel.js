import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: String },
    originalPrice: { type: Number },
    discountPrice: { type: Number, required: true },
    stock: { type: Number, required: true },
    ratings: { type: Number },
    shopId: { type: String, required: true },
    shop: { type: Object },
    sold_out: { type: Number, default: 0 },
    images: {type: String, required: true},
    // images: [],
    reviews: [
      {
        user: { type: Object },
        rating: { type: Number },
        comment: { type: String },
        productId: { type: String },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
  },
  { timestamps: true }
);

// Product Model
const Product = mongoose.model('Product', productSchema);
export default Product;
