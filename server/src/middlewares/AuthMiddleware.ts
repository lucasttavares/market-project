import TokenManipulator from '../utils/TokenManipulator';
import { Request, Response, NextFunction } from 'express';
import HttpStatusCode from '../utils/enum/httpStatusCode';

export default class AuthMiddleware {
  public static routeFilter(
    request: Request,
    response: Response,
    next: NextFunction,
  ): void | Response {
    const { authorization }: any = request.headers;

    if (authorization === undefined) {
      return response.status(404).send({ error: 'Token not found' });
    }

    const token = authorization.split(' ')[1];

    return TokenManipulator.validateToken(token)
      ? next()
      : response
          .status(HttpStatusCode.BAD_REQUEST)
          .send({ error: 'Invalid token' });
  }
}
