import { Prisma } from '@prisma/client';
import AdminRepository from '../../entities/AdminRepository';
import bcrypt from 'bcrypt';
import HttpStatusCode from '../../utils/enum/httpStatusCode';
import TokenManipulator from '../../utils/TokenManipulator';

export default class AdminServices {
  constructor(private readonly repository: AdminRepository) {}

  async save(data: Prisma.UserAdminCreateInput) {
    const hashedPassorwd = await bcrypt.hash(data.password, 10);
    const createdAdmin = await this.repository.create({
      ...data,
      password: hashedPassorwd,
    });

    return { ...createdAdmin, password: undefined };
  }

  async isFounded(email: string) {
    const admin = await this.repository.findByEmail(email);
    if (!admin) {
      throw {
        status: HttpStatusCode.NOT_FOUND,
        message: { error: 'Admin not fount' },
      };
    }
    return admin;
  }

  async verifyCredentials(email: string, password: string) {
    const admin = await this.repository.findByEmail(email);
    let adminExists = true;

    if (!admin) {
      adminExists = false;
    }

    if (!adminExists) {
      throw {
        status: HttpStatusCode.NOT_FOUND,
        message: { error: 'Admin not found' },
      };
    }

    const decriptedPassword = await bcrypt.compare(password, admin!.password);
    if (!decriptedPassword) {
      throw {
        status: HttpStatusCode.BAD_REQUEST,
        message: { error: 'Invalid password' },
      };
    }

    return {
      access_token: TokenManipulator.generateToken(admin),
    };
  }
}
