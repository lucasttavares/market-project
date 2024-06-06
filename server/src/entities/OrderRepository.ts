import { Prisma } from '@prisma/client';
import prismaClient from '../infra/prismaClient';

export default class OrderRepository {
  async create(data: Prisma.OrderCreateInput) {
    return await prismaClient.order.create({ data });
  }

  async findAll() {
    return await prismaClient.order.findMany();
  }

  async findByCode(code: string) {
    return await prismaClient.order.findUnique({ where: { code } });
  }

  async update(id: string, data: Prisma.OrderUpdateInput) {
    return await prismaClient.order.update({ data, where: { id } });
  }

  async delete(id: string) {
    return await prismaClient.order.delete({ where: { id } });
  }

  async cancel(code: string) {
    return await prismaClient.order.update({
      where: { code },
      data: { status: 5 },
    });
  }

  async updateStatus(code: string) {
    return await prismaClient.order.update({
      where: { code },
      data: { status: { increment: 1 } },
    });
  }
}
