import ClientRepository from '../../entities/ClientRepository';
import ClientController from './ClientController';
import ClientServices from './ClientServices';

export const clientFactory = () => {
  const repository = new ClientRepository();
  const services = new ClientServices(repository);
  const controller = new ClientController(services);
  return controller;
};
