import { Prisma } from '@prisma/client';
import prismaClient from '../infra/prismaClient';

export default class CompanyRepository {
  async create(data: Prisma.UserCompanyCreateInput) {
    return await prismaClient.userCompany.create({ data });
  }

  async findAll() {
    return await prismaClient.userCompany.findMany();
  }

  async findByEmail(email: string) {
    return await prismaClient.userCompany.findUnique({ where: { email } });
  }
}
