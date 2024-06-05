import { Request, Response } from 'express';
import HttpStatusCode from '../../utils/enum/httpStatusCode';
import CompanyServices from './CompanyServices';
import ProductRepository from '../../entities/ProductRepository';
import fs from 'fs';

export default class CompanyController {
  constructor(
    private readonly companyServices: CompanyServices,
    private readonly productRepository: ProductRepository,
  ) {}

  register = async (req: Request, res: Response) => {
    const company = req.body;
    try {
      return res
        .status(HttpStatusCode.CREATED)
        .send(await this.companyServices.save(company));
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
}
