import { Request, Response } from 'express';
import HttpStatusCode from '../../utils/enum/httpStatusCode';
import ClientServices from './ClientServices';

export default class ClientController {
  constructor(private readonly services: ClientServices) {}

  register = async (req: Request, res: Response) => {
    const client = req.body;
    try {
      return res
        .status(HttpStatusCode.CREATED)
        .send(await this.services.save(client));
    } catch (error) {
      console.log(error);
      return res.status(HttpStatusCode.BAD_REQUEST).send(error);
    }
  };

  login = async (req: Request, res: Response) => {
    const client = req.body;
    try {
      return res
        .status(HttpStatusCode.OK)
        .send(
          await this.services.verifyCredentials(client.email, client.password),
        );
    } catch (error: any) {
      console.log(error);
      return res.status(error.status).send(error.message);
    }
  };
}
