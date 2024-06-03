import { Router } from 'express';
import { companyFactory } from '../modules/company/CompanyFactory';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const companyRouter = Router();

companyRouter.post(
  '/register',
  AuthMiddleware.routeFilter,
  companyFactory().register,
);

companyRouter.post('/login', companyFactory().login);

export { companyRouter };
