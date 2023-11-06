import mongoose from 'mongoose';

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    conversationId: { type: String },
    text: { type: String },
    sender: { type: String },
    images: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

// Message Model
const Message = mongoose.model('Message', messageSchema);
export default Message;
