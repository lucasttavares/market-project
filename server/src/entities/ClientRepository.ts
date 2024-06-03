import { Prisma } from '@prisma/client';
import prismaClient from '../infra/prismaClient';

export default class ClientRepository {
  async create(data: Prisma.UserClientCreateInput) {
    return await prismaClient.userClient.create({ data });
  }

  async findByEmail(email: string) {
    return await prismaClient.userClient.findUnique({ where: { email } });
  }
}
