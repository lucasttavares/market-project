import CompanyRepository from '../../entities/CompanyRepository';
import CompanyServices from './CompanyServices';
import CompanyController from './CompanyController';
import ProductRepository from '../../entities/ProductRepository';
import OrderRepository from '../../entities/OrderRepository';

export const companyFactory = () => {
  const companyRepository = new CompanyRepository();
  const productRepository = new ProductRepository();
  const orderRepository = new OrderRepository();
  const services = new CompanyServices(
    companyRepository,
    productRepository,
    orderRepository,
  );
  const controller = new CompanyController(
    services,
    productRepository,
    orderRepository,
  );
  return controller;
};
