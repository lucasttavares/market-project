import { Prisma } from '@prisma/client';
import ClientRepository from '../../entities/ClientRepository';
import bcrypt from 'bcrypt';
import HttpStatusCode from '../../utils/enum/httpStatusCode';
import TokenManipulator from '../../utils/TokenManipulator';
import OrderRepository from '../../entities/OrderRepository';

export default class ClientServices {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly orderRepository: OrderRepository,
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
}
