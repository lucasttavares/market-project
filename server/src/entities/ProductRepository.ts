import { Prisma } from '@prisma/client';
import prismaClient from '../infra/prismaClient';

export default class ProductRepository {
  async create(data: Prisma.ProductCreateInput) {
    return await prismaClient.product.create({ data });
  }

  async findAll() {
    return await prismaClient.product.findMany();
  }

  async findById(id: string) {
    return await prismaClient.product.findUnique({ where: { id } });
  }

  async findByName(name: string) {
    return await prismaClient.product.findMany({ where: { name } });
  }

  async findByCategory(category: string) {
    return await prismaClient.product.findMany({ where: { category } });
  }

  async update(id: string, data: Prisma.ProductUpdateInput) {
    return await prismaClient.product.update({ data, where: { id } });
  }

  async delete(id: string) {
    return await prismaClient.product.delete({ where: { id } });
  }
}
