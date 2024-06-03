import { Router } from 'express';
import { adminFactory } from '../modules/admin/AdminFactory';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const adminRouter = Router();

adminRouter.post(
  '/register',
  AuthMiddleware.routeFilter,
  adminFactory().register,
);

adminRouter.post('/login', adminFactory().login);

export { adminRouter };
