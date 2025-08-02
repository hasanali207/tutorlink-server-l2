import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post('/login', AuthControllers.loginUser);
router.post(
  '/register',
  validateRequest(UserValidation.createUserValidationSchema),
  AuthControllers.createUser,
);
// router.post(
//   '/refresh-token',
//   validateRequest(AuthValidation.refreshTokenValidationSchema),
//   AuthControllers.refreshToken,
// );
export const AuthRoutes = router;
