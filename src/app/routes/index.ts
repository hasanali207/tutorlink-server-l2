import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { PaymentRouter } from '../modules/payment/payment.route';
import { ReviewRoutes } from '../modules/reviews/review.route';
import { PermitRouter } from '../modules/sendPermitTutor/permitTutor.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/permits',
    route: PermitRouter,
  },
  {
    path: '/payment',
    route: PaymentRouter,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
