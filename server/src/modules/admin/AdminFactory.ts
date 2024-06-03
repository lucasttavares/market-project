import AdminRepository from '../../entities/AdminRepository';
import AdminController from './AdminController';
import AdminServices from './AdminServices';

export const adminFactory = () => {
  const repository = new AdminRepository();
  const services = new AdminServices(repository);
  const controller = new AdminController(services);
  return controller;
};
