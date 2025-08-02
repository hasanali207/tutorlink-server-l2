import { IReview } from './review.interface';
import Review from './review.model';

const createReview = async (payload: IReview) => {
  const result = await Review.create(payload);
  return result;
};
const getReview = async (tutorId: string) => {
  const requests = await Review.find({ tutorId }).exec();
  return requests;
};
export const reviewServices = {
  createReview,
  getReview,
};
