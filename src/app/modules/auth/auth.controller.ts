import { StatusCodes } from 'http-status-codes';
import { AuthServices } from './auth.service';
import sendResponse from '../../utilis/sendResponse';
import { catchAsync } from '../../utilis/catchAsync';
import Config from '../../Config';

const createUser = catchAsync(async (req, res) => {
  const result = await AuthServices.createUser(req.body);

  sendResponse(res, {
    message: 'User registered successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken } = result;

  res.cookie('accessToken', accessToken, {
    secure: Config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    message: 'Login successful',
    statusCode: StatusCodes.OK,
    data: { accessToken: accessToken },
  });
});

export const AuthControllers = {
  createUser,
  loginUser,
};
