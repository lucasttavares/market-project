import { Router } from 'express';
import { clientFactory } from '../modules/client/ClientFactory';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const clientRouter = Router();

clientRouter.post('/register', clientFactory().register);

clientRouter.post('/login', clientFactory().login);

clientRouter.post(
  '/order/create',
  AuthMiddleware.routeFilter,
  clientFactory().createOrder,
);

clientRouter.get(
  '/order/find-all',
  AuthMiddleware.routeFilter,
  clientFactory().findOrders,
);

clientRouter.get(
  '/order/find-by-code/:code',
  AuthMiddleware.routeFilter,
  clientFactory().findOrderByCode,
);

export { clientRouter };
