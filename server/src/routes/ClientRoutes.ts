import { Router } from 'express';
import { clientFactory } from '../modules/client/ClientFactory';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const clientRouter = Router();

clientRouter.post('/register', clientFactory().register);

clientRouter.post('/login', clientFactory().login);

export { clientRouter };
