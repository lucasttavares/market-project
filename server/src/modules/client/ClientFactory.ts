import ClientRepository from '../../entities/ClientRepository';
import OrderRepository from '../../entities/OrderRepository';
import ClientController from './ClientController';
import ClientServices from './ClientServices';

export const clientFactory = () => {
  const clientRepository = new ClientRepository();
  const orderRepository = new OrderRepository();
  const services = new ClientServices(clientRepository, orderRepository);
  const controller = new ClientController(services, orderRepository);
  return controller;
};
