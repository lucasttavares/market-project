import { Request, Response } from 'express';
import HttpStatusCode from '../../utils/enum/httpStatusCode';
import CompanyServices from './CompanyServices';
import ProductRepository from '../../entities/ProductRepository';
import OrderRepository from '../../entities/OrderRepository';

export default class CompanyController {
  constructor(
    private readonly companyServices: CompanyServices,
    private readonly productRepository: ProductRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  register = async (req: Request, res: Response) => {
    const company = req.body;
    const image = req.file;
    try {
      return res.status(HttpStatusCode.CREATED).send(
        await this.companyServices.save({
          ...company,
          image: image?.path,
          number: Number(company.number),
          delivery: Number(company.delivery),
        }),
      );
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
          await this.companyServices.verifyCredentials(
            company.email,
            company.password,
          ),
        );
    } catch (error: any) {
      console.log(error);
      return res.status(error.status).send(error.message);
    }
  };

  createProduct = async (req: Request, res: Response) => {
    const product = req.body;
    const image = req.file;
    try {
      return res.status(HttpStatusCode.CREATED).send(
        await this.productRepository.create({
          ...product,
          price: Number(product.price),
          units: Number(product.units),
          image: image?.path,
        }),
      );
    } catch (error) {
      return res.status(HttpStatusCode.BAD_REQUEST).send(error);
    }
  };

  findProducts = async (req: Request, res: Response) => {
    return res
      .status(HttpStatusCode.OK)
      .send(await this.productRepository.findAll());
  };

  findProductById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      await this.companyServices.verifyProductExists(id);
      return res
        .status(HttpStatusCode.OK)
        .send(await this.productRepository.findById(id));
    } catch (error) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .send({ error: 'Product not found' });
    }
  };

  findProductByName = async (req: Request, res: Response) => {
    const name = req.params.name;
    return res
      .status(HttpStatusCode.OK)
      .send(await this.productRepository.findByName(name));
  };

  findProductByCategory = async (req: Request, res: Response) => {
    const category = req.params.category;
    return res
      .status(HttpStatusCode.OK)
      .send(await this.productRepository.findByCategory(category));
  };

  updateProduct = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    try {
      await this.companyServices.verifyProductExists(id);
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .send(await this.productRepository.update(id, data));
    } catch (error) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .send({ error: 'Product not found' });
    }
  };

  deleteProduct = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      await this.companyServices.verifyProductExists(id);
      await this.productRepository.delete(id);
      return res.status(HttpStatusCode.NO_CONTENT).send();
    } catch (error) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .send({ error: 'Product not found' });
    }
  };

  cancelOrder = async (req: Request, res: Response) => {
    const code = req.params.code;
    try {
      await this.companyServices.verifyOrderExists(code);
      return res
        .status(HttpStatusCode.OK)
        .send(await this.companyServices.confirmCancel(code));
    } catch (error: any) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .send({ error: 'Error when cancel order' });
    }
  };

  nextOrderStatus = async (req: Request, res: Response) => {
    const code = req.params.code;
    const orderExists = await this.orderRepository.findByCode(code);
    if (!orderExists) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .send({ error: 'Order not found' });
    }

    try {
      await this.companyServices.verifyOrderStatus(code);
      return res
        .status(HttpStatusCode.OK)
        .send(await this.orderRepository.updateStatus(code));
    } catch (error) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .send({ error: 'Order already completed' });
    }
  };
}
