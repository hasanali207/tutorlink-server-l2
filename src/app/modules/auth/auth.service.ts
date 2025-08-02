
import { TLoginUser } from './auth.interface';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { createToken } from './auth.utils';
import Config from '../../Config';

const createUser = async (payload: TUser) => {
  if (payload.availability) {
    payload.availability.from = new Date(payload.availability.from);
    payload.availability.to = new Date(payload.availability.to);
  }

  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(payload.email);
  if (!user) {
    throw Error('User is not found');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw Error('The user is deleted');
  }
  // checking if the user is blocked
  const userStatus = user?.isBlocked;
  if (userStatus) {
    throw Error('The User is blocked');
  }
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new Error('Invalid credentials');

  const jwtPayload = {
    _id: user._id,
    email: user.email,
    role: user.role,

  };

  const accessToken = createToken(
    jwtPayload,
    Config.jwt_access_token as string,
    Config.jwt_access_expireIn as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  createUser,
  loginUser,
};
