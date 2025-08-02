import { StatusCodes } from "http-status-codes";

import { reviewServices } from "./review.service";
import { catchAsync } from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";

const createReview = catchAsync(async (req, res) => {
    const result = await reviewServices.createReview(req.body);
  
    sendResponse(res, {
      message: 'Review registered successfully',
      statusCode: StatusCodes.CREATED,
      data: result,
    });
  });
  const getReview = catchAsync(async (req, res) => {
    const { tutorId  } = req.params;
    const result = await reviewServices.getReview(tutorId );
    sendResponse(res, {
      message: "Review fetched successfully",
      statusCode: StatusCodes.OK,
      data: result,
    });
  });
  export const reviewControllers = {
    createReview,getReview
  };
  