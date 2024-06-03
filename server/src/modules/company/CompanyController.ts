import { Request, Response } from 'express';
import HttpStatusCode from '../../utils/enum/httpStatusCode';
import CompanyServices from './CompanyServices';

export default class CompanyController {
  constructor(private readonly services: CompanyServices) {}

  register = async (req: Request, res: Response) => {
    const company = req.body;
    try {
      return res
        .status(HttpStatusCode.CREATED)
        .send(await this.services.save(company));
    } catch (error) {
      console.log(error);
      return res.status(HttpStatusCode.BAD_REQUEST).send(error);
    }
  };

  login = async (req: Request, res: Response) => {
    const company = req.body;
    try {
      return res
        .status(HttpStatusCode.OK)
        .send(
          await this.services.verifyCredentials(
            company.email,
            company.password,
          ),
        );
    } catch (error: any) {
      console.log(error);
      return res.status(error.status).send(error.message);
    }
  };
}
