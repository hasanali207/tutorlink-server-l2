// user.controller.ts
import { StatusCodes } from 'http-status-codes';
import { userServices } from './user.service';
import sendResponse from '../../utilis/sendResponse';
import { catchAsync } from '../../utilis/catchAsync';

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userServices.getAllUsers();
  sendResponse(res, {
    message: 'User fetched successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const getAllTutors = catchAsync(async (req, res) => {
  const result = await userServices.getAllTutors();
  sendResponse(res, {
    message: 'Tutors fetched successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});


const getTutorById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServices.getTutorById(id);
  sendResponse(res, {
    message: 'Tutor fetched successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});
const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServices.getUser(id);
  sendResponse(res, {
    message: 'User fetched successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});
const updateUser = catchAsync(async (req, res) => {
  const { email } = req.params; // get email from route parameter

  const result = await userServices.updateUser(email, req.body); // update by email

  sendResponse(res, {
    message: 'User is updated successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});



export const userControllers = {
  getAllUsers,
  updateUser,
  getAllTutors,
  getTutorById,
  getSingleUser,
};
