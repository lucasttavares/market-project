import { Prisma } from '@prisma/client';
import prismaClient from '../infra/prismaClient';

export default class AdminRepository {
  async create(data: Prisma.UserAdminCreateInput) {
    return await prismaClient.userAdmin.create({ data });
  }

  async findByEmail(email: string) {
    return await prismaClient.userAdmin.findUnique({ where: { email } });
  }
}
