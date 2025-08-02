import { model, Schema } from 'mongoose';
const ReviewSchema = new Schema(
  {
    tutorId: { type: String, required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    reviewText: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Review = model('reviews', ReviewSchema);
export default Review;
