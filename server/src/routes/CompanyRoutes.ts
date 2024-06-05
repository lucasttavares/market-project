import { Router } from 'express';
import { companyFactory } from '../modules/company/CompanyFactory';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import upload from '../utils/upload';

const companyRouter = Router();

companyRouter.post(
  '/register',
  AuthMiddleware.routeFilter,
  companyFactory().register,
);

companyRouter.post('/login', companyFactory().login);

companyRouter.post(
  '/product/create',
  AuthMiddleware.routeFilter,
  upload.single('image'),
  companyFactory().createProduct,
);

companyRouter.get(
  '/product/find-all',
  AuthMiddleware.routeFilter,
  companyFactory().findProducts,
);

companyRouter.get(
  '/product/find-by-id/:id',
  AuthMiddleware.routeFilter,
  companyFactory().findProductById,
);

companyRouter.patch(
  '/product/update/:id',
  AuthMiddleware.routeFilter,
  companyFactory().updateProduct,
);

companyRouter.delete(
  '/product/delete/:id',
  AuthMiddleware.routeFilter,
  companyFactory().deleteProduct,
);

export { companyRouter };
