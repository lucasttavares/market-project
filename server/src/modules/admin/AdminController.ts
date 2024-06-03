import { Request, Response } from 'express';
import HttpStatusCode from '../../utils/enum/httpStatusCode';
import AdminServices from './AdminServices';

export default class AdminController {
  constructor(private readonly services: AdminServices) {}

  register = async (req: Request, res: Response) => {
    const admin = req.body;
    try {
      return res
        .status(HttpStatusCode.CREATED)
        .send(await this.services.save(admin));
    } catch (error) {
      console.log(error);
      return res.status(HttpStatusCode.BAD_REQUEST).send(error);
    }
  };

  login = async (req: Request, res: Response) => {
    const admin = req.body;
    try {
      return res
        .status(HttpStatusCode.OK)
        .send(
          await this.services.verifyCredentials(admin.email, admin.password),
        );
    } catch (error: any) {
      console.log(error);
      return res.status(error.status).send(error.message);
    }
  };
}
