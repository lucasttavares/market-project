import CompanyRepository from '../../entities/CompanyRepository';
import CompanyServices from './CompanyServices';
import CompanyController from './CompanyController';

export const companyFactory = () => {
  const repository = new CompanyRepository();
  const services = new CompanyServices(repository);
  const controller = new CompanyController(services);
  return controller;
};
