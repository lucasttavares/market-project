import CompanyRepository from '../../entities/CompanyRepository';
import CompanyServices from './CompanyServices';
import CompanyController from './CompanyController';
import ProductRepository from '../../entities/ProductRepository';

export const companyFactory = () => {
  const companyRepository = new CompanyRepository();
  const productRepository = new ProductRepository();
  const services = new CompanyServices(companyRepository, productRepository);
  const controller = new CompanyController(services, productRepository);
  return controller;
};
