import { Prisma } from '@prisma/client';
import CompanyRespository from '../../entities/CompanyRepository';
import bcrypt from 'bcrypt';
import HttpStatusCode from '../../utils/enum/httpStatusCode';
import TokenManipulator from '../../utils/TokenManipulator';
import ProductRepository from '../../entities/ProductRepository';

export default class CompanyServices {
  constructor(
    private readonly companyRepository: CompanyRespository,
    private readonly productRepository: ProductRepository,
  ) {}

  async save(data: Prisma.UserCompanyCreateInput) {
    const hashedPassorwd = await bcrypt.hash(data.password, 10);
    const createdCompany = await this.companyRepository.create({
      ...data,
      password: hashedPassorwd,
    });

    return { ...createdCompany, password: undefined };
  }

  async isFounded(email: string) {
    const company = await this.companyRepository.findByEmail(email);
    if (!company) {
      throw {
        status: HttpStatusCode.NOT_FOUND,
        message: { error: 'company not fount' },
      };
    }
    return company;
  }

  async verifyCredentials(email: string, password: string) {
    const company = await this.companyRepository.findByEmail(email);
    let companyExists = true;

    if (!company) {
      companyExists = false;
    }

    if (!companyExists) {
      throw {
        status: HttpStatusCode.NOT_FOUND,
        message: { error: 'company not found' },
      };
    }

    const decriptedPassword = await bcrypt.compare(password, company!.password);
    if (!decriptedPassword) {
      throw {
        status: HttpStatusCode.BAD_REQUEST,
        message: { error: 'Invalid password' },
      };
    }

    return {
      access_token: TokenManipulator.generateToken(company),
    };
  }

  async verifyProductExists(id: string) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error();
    }
  }
}
