import { Request, Response } from 'express';
import HttpStatusCode from '../../utils/enum/httpStatusCode';
import ClientServices from './ClientServices';
import OrderRepository from '../../entities/OrderRepository';

export default class ClientController {
  constructor(
    private readonly clientServices: ClientServices,
    private readonly orderRepository: OrderRepository,
  ) {}

  register = async (req: Request, res: Response) => {
    const client = req.body;
    try {
      return res
        .status(HttpStatusCode.CREATED)
        .send(await this.clientServices.save(client));
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
          await this.clientServices.verifyCredentials(
            client.email,
            client.password,
          ),
        );
    } catch (error: any) {
      console.log(error);
      return res.status(error.status).send(error.message);
    }
  };

  createOrder = async (req: Request, res: Response) => {
    const order = req.body;
    try {
      return res
        .status(HttpStatusCode.CREATED)
        .send(await this.clientServices.confirmOder(order.products, order));
    } catch (error: any) {
      return res.status(HttpStatusCode.BAD_REQUEST).send(error.message);
    }
  };

  findOrders = async (req: Request, res: Response) => {
    return res
      .status(HttpStatusCode.OK)
      .send(await this.orderRepository.findAll());
  };

  findOrderByCode = async (req: Request, res: Response) => {
    const code = req.params.code;
    try {
      await this.clientServices.verifyOrderExists(code);
      return res
        .status(HttpStatusCode.OK)
        .send(await this.orderRepository.findByCode(code));
    } catch (error) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .send({ error: 'Order not found' });
    }
  };
}
