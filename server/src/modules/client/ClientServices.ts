import { Prisma, Product } from '@prisma/client';
import ClientRepository from '../../entities/ClientRepository';
import bcrypt from 'bcrypt';
import HttpStatusCode from '../../utils/enum/httpStatusCode';
import TokenManipulator from '../../utils/TokenManipulator';
import OrderRepository from '../../entities/OrderRepository';
import ProductRepository from '../../entities/ProductRepository';

export default class ClientServices {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async save(data: Prisma.UserClientCreateInput) {
    const hashedPassorwd = await bcrypt.hash(data.password, 10);
    const createdClient = await this.clientRepository.create({
      ...data,
      password: hashedPassorwd,
    });

    return { ...createdClient, password: undefined };
  }

  async isFounded(email: string) {
    const client = await this.clientRepository.findByEmail(email);
    if (!client) {
      throw {
        status: HttpStatusCode.NOT_FOUND,
        message: { error: 'Client not fount' },
      };
    }
    return client;
  }

  async verifyCredentials(email: string, password: string) {
    const client = await this.clientRepository.findByEmail(email);
    let clientExists = true;

    if (!client) {
      clientExists = false;
    }

    if (!clientExists) {
      throw {
        status: HttpStatusCode.NOT_FOUND,
        message: { error: 'Client not found' },
      };
    }

    const decriptedPassword = await bcrypt.compare(password, client!.password);
    if (!decriptedPassword) {
      throw {
        status: HttpStatusCode.BAD_REQUEST,
        message: { error: 'Invalid password' },
      };
    }

    return {
      access_token: TokenManipulator.generateToken(client),
    };
  }

  async verifyOrderExists(code: string) {
    const order = await this.orderRepository.findByCode(code);
    if (!order) {
      throw new Error();
    }
  }

  async confirmOder(products: string[], order: Prisma.OrderCreateInput) {
    try {
      const orderExists = await this.orderRepository.findByCode(order.code);
      if (orderExists) {
        throw new Error('Order already exists');
      }

      for (let i = 0; i < products.length; i++) {
        const product = await this.productRepository.findById(products[i]);

        if (!product) {
          throw new Error(`Product ${products[i]} not found`);
        }
        if (product.units <= 0) {
          throw new Error(`Product ${products[i]} not available`);
        }
      }

      for (let i = 0; i < products.length; i++) {
        const product: any = await this.productRepository.findById(products[i]);

        await this.productRepository.update(product.id, {
          units: (product.units -= 1),
        });
      }

      return await this.orderRepository.create(order);
    } catch (error) {
      throw { message: { error: `${error as Error}` } };
    }
  }
}
