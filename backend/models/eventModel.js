import mongoose from 'mongoose';

const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    start_Date: { type: Date, required: true },
    Finish_Date: { type: Date, required: true },
    status: { type: String, default: 'Running' },
    tags: { type: String },
    originalPrice: { type: Number },
    discountPrice: { type: Number, required: true },
    stock: { type: Number, required: true },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    shopId: { type: String, required: true },
    shop: { type: Object, required: true },
    sold_out: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

// Event Model
const Event = mongoose.model('Event', eventSchema);
export default Event;
